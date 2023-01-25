import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralParameter, ModalInfo } from 'src/app/shared/models';
import { GeneralParametersService } from 'src/app/shared/services/general-parameters.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { errorStatusToMessageMapper, errorStatutResolver, openSnackBar } from 'src/app/shared/utils';

@Component({
  selector: 'app-create-edit-general-parameters-dialog',
  templateUrl: './create-edit-general-parameters-dialog.component.html',
  styleUrls: ['./create-edit-general-parameters-dialog.component.scss']
})
export class CreateEditGeneralParametersDialogComponent implements OnInit {

  static id = CreateEditGeneralParametersDialogComponent.name
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalInfo: ModalInfo<GeneralParameter>,
    private generalParametersService: GeneralParametersService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private partnersService: PartnersService,
    
  ) { }

  isProcessing = false

  formGroup!: FormGroup



  public get isEditing() {
    return this.modalInfo.data != undefined
  }
  

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      code: new FormControl(this.modalInfo.data ? this.modalInfo.data.code : "", [Validators.required]),
      value: new FormControl(this.modalInfo.data ? this.modalInfo.data.value : "", [Validators.required]),
      description: new FormControl(this.modalInfo.data ? this.modalInfo.data.description : "", [Validators.required]),
      
    })
    
    if(this.isEditing){
      this.formGroup.get("code")?.disable()
    }
    
  }

  onCreateGeneralParameter(){
    this.isProcessing = true
    this.generalParametersService.create({
      ...this.formGroup.value,
      partnerCode: this.partnersService.curPartner.partcode
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, "Paramètre crée !")
        this.isProcessing = false
        this.dialog.getDialogById(CreateEditGeneralParametersDialogComponent.id)?.close()
        this.modalInfo.callback()
      },
      error: (error: HttpErrorResponse) => {
        const errorStatus = errorStatutResolver(error.error.message)
        const message = errorStatusToMessageMapper[errorStatus.trim()]
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la création du paramètre. "+message)
        this.isProcessing = false
      }
    })
  }

  onEditGeneralParameter(){
    this.isProcessing = true
    this.generalParametersService.update({
      ...this.modalInfo.data,
      ...this.formGroup.value
      
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, "Mise à jour effectué !")
        this.isProcessing = false
        this.dialog.getDialogById(CreateEditGeneralParametersDialogComponent.id)?.close()
        this.modalInfo.callback()
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la mise à jour !")
        this.isProcessing = false
      }
    })
  }




}
