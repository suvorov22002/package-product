import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalInfo, PaymentFees, TypeOfFees } from 'src/app/shared/models';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { PaymentFeesService } from 'src/app/shared/services/payment-fees.service';
import { TypeOfFeesService } from 'src/app/shared/services/type-of-fees.service';
import { errorStatusToMessageMapper, errorStatutResolver, isEmpty, openSnackBar } from 'src/app/shared/utils';

@Component({
  selector: 'app-create-edit-payment-fees-dialog',
  templateUrl: './create-edit-payment-fees-dialog.component.html',
  styleUrls: ['./create-edit-payment-fees-dialog.component.scss']
})
export class CreateEditPaymentFeesDialogComponent implements OnInit {

  static id = CreateEditPaymentFeesDialogComponent.name
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalInfo: ModalInfo<PaymentFees>,
    private paymentFeesService: PaymentFeesService,
    private typeOfFeesService: TypeOfFeesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private partnersService: PartnersService,
    
  ) { }

  isProcessing = false

  formGroup!: FormGroup

  typeForfaits: TypeOfFees[] = []


  public get isEditing() {
    return this.modalInfo.data != undefined
  }
  

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      code: new FormControl(this.modalInfo.data ? this.modalInfo.data.code : "", [Validators.required]),
      libelle: new FormControl(this.modalInfo.data ? this.modalInfo.data.libelle : "", [Validators.required]),
      amount: new FormControl(this.modalInfo.data ? this.modalInfo.data.amount : "", [Validators.required]),
      typeForfait: new FormControl(this.modalInfo.data ? this.modalInfo.data.typeForfait : "", [Validators.required]),
    })
    this.formGroup.get("typeForfait")?.disable()
    this. onLoadTypeOfFees()
  }

  onCreatePaymentFees(){
    this.isProcessing = true
    this.paymentFeesService.create({
      ...this.formGroup.value,
      partnerCode: this.partnersService.curPartner.partcode
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, "Libellé crée !")
        this.isProcessing = false
        this.dialog.getDialogById(CreateEditPaymentFeesDialogComponent.id)?.close()
        this.modalInfo.callback()
      },
      error: (error: HttpErrorResponse) => {
        const errorStatus = errorStatutResolver(error.error.message)
        const message = errorStatusToMessageMapper[errorStatus.trim()]
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la création de la catégorie. "+message)
        this.isProcessing = false
      }
    })
  }

  onEditPaymentFees(){
    this.isProcessing = true
    this.paymentFeesService.update({
      ...this.modalInfo.data,
      ...this.formGroup.value
      
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, "Mise à jour effectué !")
        this.isProcessing = false
        this.dialog.getDialogById(CreateEditPaymentFeesDialogComponent.id)?.close()
        this.modalInfo.callback()
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la mise à jour !")
        this.isProcessing = false
      }
    })
  }


  onLoadTypeOfFees(){
    this.typeOfFeesService.getAll().subscribe({
      next: (snapshot) => {
        if(isEmpty(snapshot)){
          openSnackBar(this.snackbar, "Aucun type de redevance enregistré!")
        }
        this.formGroup.get("typeForfait")?.enable()
        this.typeForfaits = snapshot
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des types de redevances ! ")
      }
    })
  }


}
