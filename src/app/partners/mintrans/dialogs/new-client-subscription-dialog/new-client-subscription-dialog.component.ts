import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject } from 'rxjs';
import { DepartmentDelegation, Souscription, UserInfo } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { SouscriptionsService } from 'src/app/shared/services/souscriptions.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { errorStatusToMessageMapper, errorStatutResolver, openSnackBar } from 'src/app/shared/utils';

export interface NewClientSubscriptionDialogParams{
  subscriptionDoneCallback: () => void
}

@Component({
  selector: 'app-new-client-subscription-dialog',
  templateUrl: './new-client-subscription-dialog.component.html',
  styleUrls: ['./new-client-subscription-dialog.component.scss']
})
export class NewClientSubscriptionDialogComponent implements OnInit {

  static id = NewClientSubscriptionDialogComponent.name

  formGroup!: FormGroup

  accounts$: ReplaySubject<string[]> = new ReplaySubject(1)
  emails$: ReplaySubject<string[]> = new ReplaySubject(1)
  phones$: ReplaySubject<string[]> = new ReplaySubject(1)

  userInfo: UserInfo = { adresseMails: [], telephones: [], comptes: [] }
  delegations: DepartmentDelegation[] = []
  isCreatingSubscription = false
  constructor(
    private partnersService: PartnersService,
    private usersService: UsersService,
    private subscriptionsService: SouscriptionsService,
    private transactionsService: TransactionsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
    private utilsService: UtilsService,

    @Inject(MAT_DIALOG_DATA) private params : NewClientSubscriptionDialogParams
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      codeClient: new FormControl("", [Validators.required]),
      customerReferencePartner: new FormControl("", [Validators.required, Validators.pattern('^[A-Za-z0-9]{14}$')]),
      agenceSous: new FormControl(this.authService.liferayUser.codeAge, [Validators.required]),
      utiunitiate: new FormControl(this.authService.liferayUser.loginPortal, [Validators.required]),
      partnerCode: new FormControl(this.partnersService.curPartner.partcode, [Validators.required]),
      partnerName: new FormControl(this.partnersService.curPartner.partname, [Validators.required]),
      divisionAdministratif: new FormControl("", [Validators.required]),
      activity: new FormControl("", [Validators.required]),
      adresseOperator: new FormControl("", [Validators.required]),
      emails: new FormControl([]),
      txtAccounts: new FormControl([], [Validators.required]),
      txtPhones: new FormControl([], [Validators.required]),
      
    })

    this.formGroup.get('utiunitiate')?.disable()
    this.formGroup.get('agenceSous')?.disable()
    this.formGroup.get('partnerCode')?.disable()
    this.formGroup.get('partnerName')?.disable()
    this.formGroup.get('txtAccounts')?.disable()
    this.formGroup.get('txtPhones')?.disable()
   
    this.formGroup.get('divisionAdministratif')?.disable()
    this.onLoadDepartmentDivisions()
  }

  onLoadUserInfo(){
    this.isCreatingSubscription = true
    let codeClient = this.formGroup.get('codeClient')?.value
    this.usersService.getUserInfoFromClientCode(codeClient).subscribe({
      next: (data) => {
        console.log(`getUserInfoFromClientCode : `, data.comptes)
        this.accounts$.next(data.comptes as string[])
        this.emails$.next(data.adresseMails as string[])
        this.phones$.next(data.telephones as string[])
        this.userInfo = {...data}

        this.formGroup.get('txtAccounts')?.enable()
        this.formGroup.get('txtPhones')?.enable()

        const rib = data.comptes![0]
        if(rib){
          this.transactionsService.loadSignature(rib).subscribe({
            next: (link) => {
              window.open(link, '_blank')
            }
          })
        }
        this.isCreatingSubscription = false
        // Todo: Vérifier la signature
      },
      error: (err) => {
        openSnackBar(this.snackbar, `Une erreur est survenue lors de la recupération des informations utilisateurs !`)
        this.isCreatingSubscription = false
      },
    })
  }

  onCreateSubscription(){
    

    if(this.formGroup.valid){
      this.isCreatingSubscription = true

      this.subscriptionsService.createSubscription({
        ...this.formGroup.value,
        utiunitiate: this.formGroup.get('utiunitiate')?.value,
        agenceSous: this.formGroup.get('agenceSous')?.value,
        partnerCode: this.formGroup.get('partnerCode')?.value,
        partnerName: this.formGroup.get('partnerName')?.value,
        txtAccounts: this.formGroup.get('txtAccounts')?.value,
        txtPhones: this.formGroup.get('txtPhones')?.value,
        emails: this.formGroup.get('emails')?.value.join(','),
        clientName: this.userInfo.accountName,
        customerNamePartner: this.userInfo.accountName,
        cni: this.userInfo.numCNI,
        // TODO : Add libelleAgenceSous
        
      }).subscribe({
        next: () => {
          openSnackBar(this.snackbar, `La souscription a été crée !`)
          this.params.subscriptionDoneCallback()
          this.isCreatingSubscription = false
          this.dialog.getDialogById(NewClientSubscriptionDialogComponent.id)?.close()
         
        },
        error: (error: HttpErrorResponse) => {
          const errorStatus = errorStatutResolver(error.error.message)
          const message = errorStatusToMessageMapper[errorStatus]
          openSnackBar(this.snackbar, `Une erreur est survenue lors de la creation de la souscription ! ${message}`)
          this.isCreatingSubscription = false
        }
      })
    }
  }

  onLoadDepartmentDivisions(){
    this.utilsService.loadDepartementDelegations().subscribe({
      next: (value) => {
        this.delegations = value
        this.formGroup.get('divisionAdministratif')?.enable()
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération de la des délégations !")
      }
    })
  }

}
