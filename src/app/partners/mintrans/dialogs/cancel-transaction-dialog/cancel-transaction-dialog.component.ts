import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalInfo, Transaction } from 'src/app/shared/models';
import { CancelTransaction } from 'src/app/shared/models/req';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { errorStatusToMessageMapper, errorStatutResolver, openSnackBar } from 'src/app/shared/utils';

@Component({
  selector: 'app-cancel-transaction-dialog',
  templateUrl: './cancel-transaction-dialog.component.html',
  styleUrls: ['./cancel-transaction-dialog.component.scss']
})
export class CancelTransactionDialogComponent implements OnInit {

  static id = CancelTransactionDialogComponent.name
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalInfo: ModalInfo<Transaction>,
    private partnersService: PartnersService,
    private authService: AuthService,
    private transactionsService: TransactionsService,
    private snackbar: MatSnackBar
  ) { }

  isProcessing = false

  formGroup!: FormGroup

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      partnerCode: new FormControl(this.partnersService.curPartner.partcode, [Validators.required]),
      usercancel: new FormControl(this.authService.liferayUser.loginPortal, [Validators.required]),
      cancelReason: new FormControl("", [Validators.required]),
    })

    this.formGroup.get('partnerCode')?.disable()
    this.formGroup.get('usercancel')?.disable()
  }

  onCancelReason(){
    this.transactionsService.cancelTransaction(
      {
        id: this.modalInfo.data.id!,
        partnerCode: this.formGroup.get('partnerCode')?.value,
        usercancel: this.formGroup.get('usercancel')?.value,
        cancelReason: this.formGroup.get('cancelReason')?.value
      }
    ).subscribe({
      next: () => {
        openSnackBar(this.snackbar, "L'annulation a été effectué !")
        this.modalInfo.callback()
      },
      error: (error: HttpErrorResponse) => {
        const errorStatus = errorStatutResolver(error.error.message)
        const message = errorStatusToMessageMapper[errorStatus.trim()]
        if(message){
          openSnackBar(this.snackbar, message)
        }
        openSnackBar(this.snackbar, "Une erreur est survenu lors de l'annulation ! "+message)
      }
    })
  }
}
