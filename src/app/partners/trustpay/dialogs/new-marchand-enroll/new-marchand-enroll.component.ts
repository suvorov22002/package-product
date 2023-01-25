import { Component, OnInit, Inject  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { UserInfo, DepartmentDelegation } from 'src/app/shared/models';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { errorStatusToMessageMapper, errorStatutResolver, openSnackBar } from 'src/app/shared/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { NewClientSubscriptionDialogComponent } from 'src/app/partners/mintrans/dialogs/new-client-subscription-dialog/new-client-subscription-dialog.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SouscriptionsService } from 'src/app/shared/services/souscriptions.service';
import { OperatorStatus } from 'src/app/shared/models/enums';

export interface NewMarchandEnrollComponentParams{
  subscriptionDoneCallback: () => void
}

@Component({
  selector: 'app-new-marchand-enroll',
  templateUrl: './new-marchand-enroll.component.html',
  styleUrls: ['./new-marchand-enroll.component.scss']
})
export class NewMarchandEnrollComponent implements OnInit {

  static id = NewMarchandEnrollComponent.name
  formGroup!: FormGroup

  accounts$: ReplaySubject<string[]> = new ReplaySubject(1)
  emails$: ReplaySubject<string[]> = new ReplaySubject(1)
  phones$: ReplaySubject<string[]> = new ReplaySubject(1)

  userInfo: UserInfo = { adresseMails: [], telephones: [], comptes: [] }
 
  isCreatingSubscription = false

  constructor(
    private partnersService: PartnersService,
    private authService: AuthService,
    private transactionsService: TransactionsService,
    private subscriptionsService: SouscriptionsService,
    private usersService: UsersService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private params : NewMarchandEnrollComponentParams
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      codeClient: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.minLength(7)]),
      customerReferencePartner: new FormControl("", [Validators.required, Validators.pattern('^[A-Za-z0-9]{14}$')]),
      agenceSous: new FormControl(this.authService.liferayUser.codeAge, [Validators.required]),
      utiunitiate: new FormControl(this.authService.liferayUser.loginPortal, [Validators.required]),
      partnerCode: new FormControl(this.partnersService.curPartner.partcode, [Validators.required]),
      partnerName: new FormControl(this.partnersService.curPartner.partname, [Validators.required]),
      cni: new FormControl("", [Validators.required]),
      clientname: new FormControl("", [Validators.required]),
      emails: new FormControl([]),
      txtAccounts: new FormControl([], [Validators.required]),
      txtPhones: new FormControl([], [Validators.required])
    })

    
    this.formGroup.get('utiunitiate')?.disable()
    this.formGroup.get('agenceSous')?.disable()
    this.formGroup.get('partnerCode')?.disable()
    this.formGroup.get('partnerName')?.disable()
    this.formGroup.get('txtAccounts')?.disable()
    this.formGroup.get('txtPhones')?.disable()
  //  this.formGroup.get('customerReferencePartner')?.disable()
  //  this.formGroup.get('cni')?.disable()
  //  this.formGroup.get('clientname')?.disable()

  }

  onLoadUserInfo(){
      let alreadyCustomer: boolean = false
  //  if(this.formGroup.valid) {
      let codeClient = this.formGroup.get('codeClient')?.value
      if (codeClient === undefined || codeClient === '') {
          openSnackBar(this.snackbar, `Veuillez renseigner le code client !`)
          return
      }
      this.isCreatingSubscription = true
      
  // On verifie si le client a deja une souscription active ou en attente
      this.subscriptionsService.getSouscriptionFromClientCodePartner(codeClient.trim(), this.partnersService.curPartner.partcode!).subscribe({
        next: (data) => {

          if(data[0]?.operatorStatus === OperatorStatus.WAITING.valueOf()
              || data[0]?.operatorStatus === OperatorStatus.ACTIF.valueOf()
                || data[0]?.operatorStatus === OperatorStatus.SUSPENDU.valueOf()) {
                 
                  this.isCreatingSubscription = false
                  openSnackBar(this.snackbar, `Client ayant dejà souscrit ou suspendu !`)
                  return

          }
          else {
            this.usersService.getUserInfoFromClientCode(codeClient).subscribe({
              next: (data) => {
                
                this.accounts$.next(data.comptes as string[])
                this.emails$.next(data.adresseMails as string[])
                this.phones$.next(data.telephones as string[])
                this.formGroup.get('customerReferencePartner')?.setValue(data.niu)
                this.formGroup.get('cni')?.setValue(data.numCNI)
                this.formGroup.get('clientname')?.setValue(data.customerName)
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
        },
        error: (err) => {
          openSnackBar(this.snackbar, `Une erreur est survenue lors de la recupération des informations utilisateurs !`)
          this.isCreatingSubscription = false
        }
      })
     
  //  }
    
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
        phones: (this.formGroup.get('txtPhones')?.value).join("/"),
        accounts: (this.formGroup.get('txtAccounts')?.value)[0],
        nameUtiunitiate: this.authService.liferayUser.firstname,
        libelleAgenceSous: this.authService.liferayUser.libAge

        // TODO : Add libelleAgenceSous
        
      }).subscribe({
        next: () => {
          openSnackBar(this.snackbar, `La souscription a été crée !`)
          this.params.subscriptionDoneCallback()
          this.isCreatingSubscription = false
          this.dialog.getDialogById(NewMarchandEnrollComponent.id)?.close()
         
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


}
