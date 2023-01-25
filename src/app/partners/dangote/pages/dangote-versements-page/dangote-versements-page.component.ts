import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentServicesService } from 'src/app/shared/dangote-services/payment-services.service';
import { DepartmentDelegation, PaymentFees, TypeOfFees, TypeOfFeesClass } from 'src/app/shared/models';
import { TransactionStatus, TransportType } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { errorStatusToMessageMapper, errorStatutResolver, openSnackBar } from 'src/app/shared/utils';
import { greaterOrEqualThan } from 'src/app/shared/utils/validators';
import { DangotePayInRecapDialogComponent } from '../../dialogs/dangote-pay-in-recap-dialog/dangote-pay-in-recap-dialog.component';

@Component({
  selector: 'app-dangote-versements-page',
  templateUrl: './dangote-versements-page.component.html',
  styleUrls: ['./dangote-versements-page.component.scss']
})
export class DangoteVersementsPageComponent implements OnInit {

  versementFormGroup!: FormGroup

  versementIsPending = false
  delegations: DepartmentDelegation[] = []
  paymentFeesList: PaymentFees[] = []
  typefeesList: TypeOfFees[] = []

  filteredTypes = [
    { code: 'NULL', value: '----Choisir----' },
    { code: 'VERESP001', value: 'VERSEMENT ESPECES' }
  ]

  public get transportTypes() {
    return Object.values(TransportType)
  }
  
  constructor(private partnerService: PartnersService,
              private snackbar: MatSnackBar,
              private dangotePayService: PaymentServicesService,
              private authService: AuthService,
              private dialog: MatDialog) { }
  
 
  ngOnInit(): void {

    this.versementFormGroup = new FormGroup({
      referenceOperator: new FormControl("", [Validators.required, Validators.pattern('^[0-9]+$')]),
      nomOperator: new FormControl("", [Validators.required ]),
      activity: new FormControl("", [Validators.required ]),
      numeroCompte: new FormControl("", [Validators.required ]),
      categorieJustificatif: new FormControl(""),
      montantPercu: new FormControl("", [Validators.required, Validators.pattern('^[0-9]+$')]),
      montantVerse: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
      montantRemb: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
      partieVersante: new FormControl("", [Validators.required, Validators.maxLength(32)]),
      telephone: new FormControl("", [Validators.required, Validators.pattern('^6[256789][0-9]{7}$')]),
      motif: new FormControl("", [Validators.required])
    })

      this.versementFormGroup.get("montantPercu")?.addValidators([
        greaterOrEqualThan(
          this.versementFormGroup.get('montantVerse')
        )
      ])
  
      this.versementFormGroup.get('montantRemb')?.disable()
      this.versementFormGroup.get('typeJustificatif')?.disable()
      this.versementFormGroup.get('reason')?.disable()
      this.versementFormGroup.get('montantVerse')?.disable()
      this.versementFormGroup.get('montantPercu')?.disable()

  }

  onFindMerchantByReference(e: Event) {
      e.preventDefault()
      e.stopPropagation()
      const referenceOperator = this.versementFormGroup.get('referenceOperator')?.value
      const partnerName = this.partnerService.curPartner.partname!
      console.log("partner ncp ",this.partnerService.curPartner.partnerNcpVersement)

      if (referenceOperator.trim().length == 0) {
         openSnackBar(this.snackbar, "Veuillez saisir l'identifiant du marchand !")
         return
      }

      if (partnerName === undefined) {
          openSnackBar(this.snackbar, "Partenaire inconnu !")
          return
      }

      this.dangotePayService.findMerchant(referenceOperator, this.partnerService.curPartner).subscribe({
        next: (snapshot) => {
          if(snapshot === undefined || snapshot === null){
            openSnackBar(this.snackbar, "Aucun marchand ne correspondant à cette référence !")
          }
          else{
            this.versementFormGroup.get('activity')?.setValue(referenceOperator + ' - ' + snapshot.merchandName)
            this.versementFormGroup.get('numeroCompte')?.setValue(this.partnerService.curPartner.partnerNcpVersement)
            this.versementFormGroup.get('nomOperator')?.setValue(snapshot.merchandName)
            this.versementFormGroup.get('motif')?.setValue("ACHAT CIMENTS")
            this.versementFormGroup.get('montantVerse')?.enable()
            this.versementFormGroup.get('montantPercu')?.enable()
          }
          
        },
        error: () => {
          openSnackBar(this.snackbar, "Une erreur est survenu lors de la vérification du marchant !")
        }
      })
  }



  onTransportTypeChanged(e: MatSelectChange) {

  }

  onTypeOfFeesChanged(e: MatSelectChange) {

  }

  onPaymentCategorySelected(ev: MatSelectChange) {

  }

  onMontantChanged(){
    try {
      const montantPercu = parseInt(this.versementFormGroup.get('montantPercu')?.value)
      const montantVerse = parseInt(this.versementFormGroup.get('montantVerse')?.value)
      //console.log('montantVerse: ' + montantVerse)
      this.versementFormGroup.get('montantRemb')?.setValue(montantPercu - montantVerse)
    } catch (error) {
      
    }
  }

  onInitVersement() {
    
    this.versementFormGroup.markAllAsTouched()
    if(this.versementFormGroup.valid){
      
       const operation = this.versementFormGroup.get('categorieJustificatif')?.value
       
       switch(operation) { 

          case "VERESP001": { 
            const data = {
              ...this.versementFormGroup.value,
              typeOperation: this.versementFormGroup.get('categorieJustificatif')?.value,
              partnerCode: this.partnerService.curPartner.partcode, 
              creditAccount: this.partnerService.curPartner.partnerNcpVersement,
              montantPercu:  this.versementFormGroup.get('montantPercu')?.value,
              montantRemb:  this.versementFormGroup.get('montantRemb')?.value,
              montantVerse:  this.versementFormGroup.get('montantVerse')?.value,
              userCaisse: this.authService.liferayUser.loginPortal,
              ageCaisse: this.authService.liferayUser.codeAge,
              libelleAgence: this.authService.liferayUser.libAge,
              reason : this.versementFormGroup.get('motif')?.value,
              status: TransactionStatus.INITIATE
            }

            this.versementIsPending = true
            this.dangotePayService.initiateCashinPrepay(data, this.partnerService.curPartner).subscribe({
              next: (data) => {
                if (data.reponseCode !== '200') {
                  openSnackBar(this.snackbar, "Echec de la validation du versement. "+data.errorMessage)
                  this.versementIsPending = false
                  return
                }

                openSnackBar(this.snackbar, "Le versement a été effectué !")
                this.versementIsPending = false
                this.versementFormGroup.reset()

                this.dialog.open(DangotePayInRecapDialogComponent, {
                  data: data.data
                })
              },
              error: (error : HttpErrorResponse) => {
                
                this.versementIsPending = false
                const errorStatus = errorStatutResolver(error.error.message)
                const message = errorStatusToMessageMapper[errorStatus.trim()]
                if(message){
                  openSnackBar(this.snackbar, message)
                }
                openSnackBar(this.snackbar, "Une erreur est survenu lors du versement ! "+message)
              
              }
            })

            break; 
          } 
          case "VIRMT": { 
              //statements; 
              break; 
          } 
          default: { 
              //statements; 
              break; 
          } 
       }
    }
  }

  checkBuildedCurrentObject() {

      // Verification de la disponibilité des services
  }
 
}
