import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalInfo, Partner } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { openSnackBar } from 'src/app/shared/utils';
import { numAccountValidator } from 'src/app/shared/utils/validators';

@Component({
  selector: 'app-edit-partner-dialog',
  templateUrl: './edit-partner-dialog.component.html',
  styleUrls: ['./edit-partner-dialog.component.scss']
})
export class EditPartnerDialogComponent implements OnInit {

  static id = EditPartnerDialogComponent.name

  isCreatingPartner = false

  formGroup!: FormGroup
  constructor(private partnersService: PartnersService,
     private dialog: MatDialog,
     private snackbar: MatSnackBar,
     private authService: AuthService,
     @Inject(MAT_DIALOG_DATA) public modalInfo: ModalInfo<Partner>
     ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      partcode: new FormControl(this.modalInfo.data.partcode ?? "", [Validators.required]),
      partname: new FormControl(this.modalInfo.data.partname ?? "", [Validators.required]),
      account: new FormControl(this.modalInfo.data.account ?? "", [Validators.required, numAccountValidator()]),
      phones: new FormControl(this.modalInfo.data.phones ?? "", [Validators.required, Validators.pattern('^(6[256789][0-9]{7}-?){1,}$')]),
      emails: new FormControl(this.modalInfo.data.emails ?? "", [Validators.required, Validators.pattern('^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+-?){1,}$')]),
      partnerNcpVersement: new FormControl(this.modalInfo.data.partnerNcpVersement ?? "", [Validators.required, numAccountValidator()]),
      comptabilisationTransit: new FormControl(this.modalInfo.data.comptabilisationTransit ?? true, [Validators.required]),
      kycPartner: new FormControl(this.modalInfo.data.kycPartner ?? true, [Validators.required]),
      host: new FormControl(this.modalInfo.data.host ?? "", [Validators.required]),
      port: new FormControl(this.modalInfo.data.port ?? "", [Validators.required]),
      protocole: new FormControl(this.modalInfo.data.protocole ?? "", [Validators.required]),
      path: new FormControl(this.modalInfo.data.path ?? "", [Validators.required])
    })
  }

  onEditPartner(){
    this.formGroup.markAllAsTouched()
    /* if(this.formGroup.valid){
      
    } */
    let data = {
      ...this.modalInfo.data,
      ...this.formGroup.value, 
     
      utiMod:  this.authService.liferayUser.loginPortal,
      nameUtiMod:  this.authService.fullname,
      partnerNcpVersement: this.formGroup.get('partnerNcpVersement')?.disabled 
      ? null 
      : this.formGroup.get('partnerNcpVersement')?.value
      
    }

   
    this.isCreatingPartner = true
    this.partnersService.updatePartner(data).subscribe({
      next: () => {
        this.dialog.getDialogById(EditPartnerDialogComponent.id)?.close()
        openSnackBar(this.snackbar, `Le partenaire(${data.partcode}) a été mis à jour !`)
        this.isCreatingPartner = false
        this.modalInfo.callback()
      },
      error: (err) => {
        openSnackBar(this.snackbar, `Une erreur est survenue lors de la mise à jour du partenaire(${data.partcode}) !`)
        this.isCreatingPartner = false
      },
    })
  }

  onUpdateCompteTransit(ev: MatCheckboxChange){
    if(ev.checked){
      this.formGroup.get('partnerNcpVersement')?.enable()
    }
    else{
      this.formGroup.get('partnerNcpVersement')?.disable()
    }
  }


}
