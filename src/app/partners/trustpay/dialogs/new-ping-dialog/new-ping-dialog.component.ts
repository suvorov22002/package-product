import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject } from 'rxjs';
import { Souscription } from 'src/app/shared/models';
import { OperatorStatus } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { SouscriptionsService } from 'src/app/shared/services/souscriptions.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { openSnackBar } from 'src/app/shared/utils';

export interface NewPingDialogComponentParams{
  subscriptionDoneCallback: () => void
}

@Component({
  selector: 'app-new-ping-dialog',
  templateUrl: './new-ping-dialog.component.html',
  styleUrls: ['./new-ping-dialog.component.scss']
})
export class NewPingDialogComponent implements OnInit {

  static id = NewPingDialogComponent.name
  formGroup!: FormGroup

  accounts$: ReplaySubject<string[]> = new ReplaySubject(1)
  emails$: ReplaySubject<string[]> = new ReplaySubject(1)
  phones$: ReplaySubject<string[]> = new ReplaySubject(1)

  isCreatingSubscription = false

  constructor(
    private partnersService: PartnersService,
    private authService: AuthService,
    private transactionsService: TransactionsService,
    private subscriptionsService: SouscriptionsService,
    private usersService: UsersService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private params : any
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


    this.onLoadUserInfo()
  }

  onLoadUserInfo(){
    console.log(this.params.data.emails)
    this.formGroup.get('codeClient')?.setValue(this.params.data.codeClient)
    this.formGroup.get('customerReferencePartner')?.setValue(this.params.data.customerReferencePartner)
    this.formGroup.get('clientname')?.setValue(this.params.data.clientName)
  //  this.formGroup.get('emails')?.setValue(this.params.data.emails)
    this.formGroup.get('cni')?.setValue(this.params.data.cni)
  //  this.formGroup.get('txtAccounts')?.setValue(this.params.data.txtAccounts)
  //  this.formGroup.get('txtPhones')?.setValue(this.params.data.txtPhones)
  }

  onCreateSubscription(){
    let codeClient = this.formGroup.get('codeClient')?.value
    if (codeClient === undefined || codeClient === '') {
      openSnackBar(this.snackbar, `Veuillez renseigner le code client !`)
      return
    }

    this.subscriptionsService.getSouscriptionFromClientCodePartner(codeClient.trim(), this.partnersService.curPartner.partcode!).subscribe({
      next: (data) => {

        if(data[0]?.operatorStatus !== OperatorStatus.ACTIF.valueOf()) {
               
                this.isCreatingSubscription = false
                openSnackBar(this.snackbar, `Cet client n'a pas d'abonnement actif !`)
                return

        }
        else {
          
        }
      },
      error: (err) => {
        openSnackBar(this.snackbar, `Une erreur est survenue lors de la recupération des informations utilisateurs !`)
        this.isCreatingSubscription = false
      }
    })
  }

}
