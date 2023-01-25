import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalInfo, TypeOfFees } from 'src/app/shared/models';
import { TransportType } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { TypeOfFeesService } from 'src/app/shared/services/type-of-fees.service';
import { errorStatusToMessageMapper, errorStatutResolver, openSnackBar } from 'src/app/shared/utils';



@Component({
  selector: 'app-create-edit-type-of-fees-dialog',
  templateUrl: './create-edit-type-of-fees-dialog.component.html',
  styleUrls: ['./create-edit-type-of-fees-dialog.component.scss']
})
export class CreateEditTypeOfFeesDialogComponent implements OnInit {

  static id = CreateEditTypeOfFeesDialogComponent.name
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalInfo: ModalInfo<TypeOfFees>,
    private typeOfFeesService: TypeOfFeesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private partnersService: PartnersService
  ) { }

  isProcessing = false

  formGroup!: FormGroup

  
  public get transportTypes() {
    return Object.values(TransportType)
  }


  
  public get isEditing() {
    return this.modalInfo.data != undefined
  }
  

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      code: new FormControl(this.modalInfo.data ? this.modalInfo.data.code : "", [Validators.required]),
      libelle: new FormControl(this.modalInfo.data ? this.modalInfo.data.libelle : "", [Validators.required]),
      segment: new FormControl(this.modalInfo.data ? this.modalInfo.data.segment : "", [Validators.required]),
    })
  }

  onCreateTypeOfFees(){
    this.isProcessing = true
    this.typeOfFeesService.create({
      ...this.formGroup.value,
      partnerCode: this.partnersService.curPartner.partcode
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, "Type de redevance crée !")
        this.isProcessing = false
        this.dialog.getDialogById(CreateEditTypeOfFeesDialogComponent.id)?.close()
        this.modalInfo.callback()
      },
      error: (error: HttpErrorResponse) => {
        const errorStatus = errorStatutResolver(error.error.message)
        const message = errorStatusToMessageMapper[errorStatus.trim()]
        openSnackBar(this.snackbar, "Une erreur est survenue lors du TFJ : "+message)
        this.isProcessing = false
      }
    })
  }

  onEditTypeOfFees(){
    this.isProcessing = true
    this.typeOfFeesService.update({
      ...this.modalInfo.data,
      ...this.formGroup.value
      
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, "Mise à jour effectué !")
        this.isProcessing = false
        this.dialog.getDialogById(CreateEditTypeOfFeesDialogComponent.id)?.close()
        this.modalInfo.callback()
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la mise à jour !")
        this.isProcessing = false
      }
    })
  }

}
