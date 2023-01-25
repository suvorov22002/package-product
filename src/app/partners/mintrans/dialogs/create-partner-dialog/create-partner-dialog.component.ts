import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatePartnerReq } from 'src/app/shared/models/req';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { openSnackBar } from 'src/app/shared/utils';
import { numAccountValidator } from 'src/app/shared/utils/validators';


@Component({
  selector: 'app-create-partner-dialog',
  templateUrl: './create-partner-dialog.component.html',
  styleUrls: ['./create-partner-dialog.component.scss']
})
export class CreatePartnerDialogComponent implements OnInit {

  static id = CreatePartnerDialogComponent.name

  isCreatingPartner = false

  formGroup!: FormGroup
  constructor(private partnersService: PartnersService,
     private dialog: MatDialog,
     private snackbar: MatSnackBar,
     private authService: AuthService
     ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      partcode: new FormControl("", [Validators.required]),
      partname: new FormControl("", [Validators.required]),
      account: new FormControl("", [Validators.required, numAccountValidator()]),
      phones: new FormControl("", [Validators.required, Validators.pattern('^(6[256789][0-9]{7}-?){1,}$')]),
      emails: new FormControl("", [Validators.required, Validators.pattern('^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+-?){1,}$')]),
      partnerNcpVersement: new FormControl("", [Validators.required, numAccountValidator()]),
      comptabilisationTransit: new FormControl(true, [Validators.required]),
      kycPartner: new FormControl(false, [Validators.required]),
      host: new FormControl("", [Validators.required]),
      port: new FormControl("", [Validators.required]),
      protocole: new FormControl("", [Validators.required]),
      path: new FormControl("", [Validators.required])
    })
  }

  onCreatePartner(){
    this.formGroup.markAllAsTouched()
    /* if(this.formGroup.valid){
      
    } */
    let data: CreatePartnerReq = {
      ...this.formGroup.value, 
      nameUtiCreation: this.authService.fullname, 
      utiCreation: this.authService.liferayUser.loginPortal,
      sizeKey:  0,
      typekey:  "AL",
      pwd:  "xxxxxx",
      utiMod:  "",
      nameUtiMod:  "",
      host:  "127.0.0.1",
      port : 0,
      protocole:  "tftp",
      path:  "glu",
      apiKey:  "xcv012"
    }

    console.log("Create Partner Data : ", data)
    this.isCreatingPartner = true
    this.partnersService.createPartner(data).subscribe({
      next: (snapshot) => {
        this.dialog.getDialogById(CreatePartnerDialogComponent.id)?.close()
        openSnackBar(this.snackbar, `Le partenaire(${data.partcode}) a été crée !`)
        
        this.isCreatingPartner = false
      },
      error: (err) => {
        openSnackBar(this.snackbar, `Une erreur est survenue lors de la création du partenaire(${data.partcode}) !`)
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
