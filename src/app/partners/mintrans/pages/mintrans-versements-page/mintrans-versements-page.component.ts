import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import {delay, map, startWith, tap} from "rxjs/operators"
import { SouscriptionsService } from 'src/app/shared/services/souscriptions.service';
import { OperatorStatus, TransactionStatus, TransportType } from 'src/app/shared/models/enums';

import { DepartmentDelegation, PaymentFees, Souscription, TypeOfFees, TypeOfFeesClass } from 'src/app/shared/models';
import { MatSelectChange } from '@angular/material/select';
import { errorStatusToMessageMapper, errorStatutResolver, isEmpty, openSnackBar } from 'src/app/shared/utils';
import { greaterOrEqualThan } from 'src/app/shared/utils/validators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CashInRecapDialogComponent } from '../../dialogs/cash-in-recap-dialog/cash-in-recap-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-mintrans-versements-page',
  templateUrl: './mintrans-versements-page.component.html',
  styleUrls: ['./mintrans-versements-page.component.scss']
})
export class MintransVersementsPageComponent implements OnInit {

  versementIsPensing = false
  versementFormGroup!: FormGroup

  paymentFeesList: PaymentFees[] = []

  filteredPaymentFeesList: Observable<PaymentFees[]> = of([]);

  typefeesList: TypeOfFees[] = []
  typefeeClassList: TypeOfFeesClass[] = []

  delegations: DepartmentDelegation[] = []
  filteredDelegations: Observable<DepartmentDelegation[]> = of([]);


  
  
  public get delegationsFormControl()  {
    return this.versementFormGroup!.get('divisionAdministratif') as FormControl
  }
  
  public get paymentFeesListFormControl() {
    return this.versementFormGroup!.get('reason') as FormControl 
  }
  
  
  
  public get transportTypes() {
    return Object.values(TransportType)
  }
  
  constructor(private partnerService: PartnersService, 
    private snackbar: MatSnackBar,
    private souscriptionsService: SouscriptionsService,
    private utilsService: UtilsService,
    private transactionsService: TransactionsService,
    private authService: AuthService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.versementFormGroup = new FormGroup({
      referenceOperator: new FormControl("", [Validators.required, Validators.pattern('^[A-Za-z0-9]{14}$')]),
      nomOperator: new FormControl("", [Validators.required ]),
      typeJustificatif: new FormControl("", [Validators.required ]),
      activity: new FormControl("", [Validators.required ]),
      adresseOperator: new FormControl("", [Validators.required ]),
      divisionAdministratif: new FormControl("", [Validators.required ]),
      segment: new FormControl("", [Validators.required ]),
      categorieJustificatif: new FormControl(""),
      montantPercu: new FormControl("", [Validators.required, Validators.pattern('^[0-9]+$')]),
      montantVerse: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
      montantRemb: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
      partieVersante: new FormControl("", [Validators.required]),
      telephone: new FormControl("", [Validators.required, Validators.pattern('^6[256789][0-9]{7}$')]),
      codeReason: new FormControl("", [Validators.required ]),
      reason: new FormControl("", [Validators.required]),
      details: new FormControl(""),
      
    })

    this.versementFormGroup.get("montantPercu")?.addValidators([
      greaterOrEqualThan(
        this.versementFormGroup.get('montantVerse')
      )
    ])

    this.filteredDelegations = this.delegationsFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDelegations(value || '')),
    );
    this.filteredPaymentFeesList = this.paymentFeesListFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPaymentFees(value || '')),
    );

    this.versementFormGroup.get('montantRemb')?.disable()
    this.versementFormGroup.get('categorieJustificatif')?.disable()
    this.versementFormGroup.get('typeJustificatif')?.disable()
    this.versementFormGroup.get('reason')?.disable()
    this.versementFormGroup.get('montantVerse')?.disable()
    this.versementFormGroup.get('codeReason')?.disable()
    
    this.versementFormGroup.get('divisionAdministratif')?.disable()

    this.onLoadDepartmentDivisions()
  }



  onInitVersement(){
    
    this.versementFormGroup.markAllAsTouched()

    if(this.versementFormGroup.valid){
      this.partnerService.getPartnerByName(this.partnerService.curPartner.partname!).subscribe({
        next: (partner) => {
          this.partnerService.curPartner = partner
          const data = {
            ...this.versementFormGroup.value,
            partnerCode: this.partnerService.curPartner.partcode, 
            creditAccount: partner.partnerNcpVersement,
            montantRemb:  this.versementFormGroup.get('montantRemb')?.value,
            montantVerse:  this.versementFormGroup.get('montantVerse')?.value,
            userCaisse: this.authService.liferayUser.loginPortal,
            ageCaisse: this.authService.liferayUser.codeAge,
            libelleAgence: this.authService.liferayUser.libAge,
            codeReason  : this.versementFormGroup.get('codeReason')?.value,
            typeOperation: '001',
            
            
          }


          this.versementIsPensing = true
          this.transactionsService.initVersement(data).subscribe({
            next: (data) => {
              openSnackBar(this.snackbar, "Le versement a été effectué !")
              this.versementIsPensing = false
              this.versementFormGroup.reset()

              this.dialog.open(CashInRecapDialogComponent, {
                data: data
              })
            },
            error: (error : HttpErrorResponse) => {
              openSnackBar(this.snackbar, error.error.error)
              /* const errorStatus = errorStatutResolver(error.error.message)
              const message = errorStatusToMessageMapper[errorStatus.trim()]
              if(message){
                openSnackBar(this.snackbar, message)
              }
              openSnackBar(this.snackbar, "Une erreur est survenu lors du versement ! "+message) */
              this.versementIsPensing = false
            }
          })
        },
        error: (error: HttpErrorResponse) => {
          openSnackBar(this.snackbar, error.error.error)
        }
      })
    }
  }

  onMontantChanged(){
    try {
      const montantPercu = parseInt(this.versementFormGroup.get('montantPercu')?.value)
      const montantVerse = parseInt(this.versementFormGroup.get('montantVerse')?.value)
      this.versementFormGroup.get('montantRemb')?.setValue(montantPercu - montantVerse)
    } catch (error) {
      
    }
  }
  
  onFindMerchantByReference(e: Event){
    e.preventDefault()
    e.stopPropagation()
    const referenceOperator = this.versementFormGroup.get('referenceOperator')?.value
    const partnerName = this.partnerService.curPartner.partname!
    this.transactionsService.loadCashInUser(referenceOperator, partnerName).subscribe({
      next: (snapshot) => {
        if(snapshot == undefined){
          openSnackBar(this.snackbar, "Aucun marchand ne correspondant à cette référence !")
        }
        else{
          this.versementFormGroup.get('activity')?.setValue(snapshot.activity)
          this.versementFormGroup.get('adresseOperator')?.setValue(snapshot.adresseOperator)
         
          this.versementFormGroup.get('nomOperator')?.setValue(snapshot.nomOperator)
        }
        
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenu lors de la vérification du marchant !")
      }
    })
  }

  

  onPaymentCategorySelected(ev: MatAutocompleteActivatedEvent){
    console.log("Mat Select Event", ev)
    const selectedItem = this.paymentFeesList.find(e => e.libelle?.trim() == ev.option?.value.trim())
    if(selectedItem){
      this.versementFormGroup.get('reason')?.setValue(selectedItem.libelle)
      this.versementFormGroup.get('montantVerse')?.setValue(selectedItem.amount)
      this.versementFormGroup.get('codeReason')?.setValue(selectedItem.code)
    }
    
  }
  onDelegationSelected(ev: MatAutocompleteActivatedEvent){
    console.log("Mat Department Select Event", ev)
    const selectedItem = this.paymentFeesList.find(e => e.libelle?.trim() == ev.option?.value.trim())
    if(selectedItem){
      console.log("Selected Item: ", selectedItem)
      this.versementFormGroup.get('divisionAdministratif')?.setValue(ev.option?.value)
      
    }
  }


  // FORMS

  onTransportTypeChanged(e: MatSelectChange){
    this.utilsService.loadTypeOfFeessFromTransportType(e.value).subscribe({
      next: (snapshot) => {
        this.typefeesList = snapshot
        this.versementFormGroup.get('typeJustificatif')?.enable()
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenu lors de la récupération des justificatifs ! Veuillez ré-essayer.")
      }
    })
  }

  onTypeOfFeesChanged(e: MatSelectChange){
    this.utilsService.loadClassFromTypeOfFees(e.value).subscribe({
      next: (snapshot) => {
        this.typefeeClassList = snapshot
        if(snapshot.length > 0) this.versementFormGroup.get('categorieJustificatif')?.enable()
        else this.versementFormGroup.get('categorieJustificatif')?.disable()
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenu lors de la récupération des justificatifs ! Veuillez ré-essayer.")
      }
    })
    this.utilsService.loadPaymentFeesFromTypeOfFees(e.value).subscribe({
      next: (snapshot) => {
        this.paymentFeesList = snapshot
        if(snapshot.length > 0)
          this.versementFormGroup.get('reason')?.enable()
        else this.versementFormGroup.get('reason')?.disable()
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenu lors de la récupération des libellés de paiements ! Veuillez ré-essayer.")
      }
    })
  }

  onLoadDepartmentDivisions(){
    this.utilsService.loadDepartementDelegations().subscribe({
      next: (value) => {
        this.delegations = value
        this.versementFormGroup.get('divisionAdministratif')?.enable()
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération de la des délégations !")
      }
    })
  }  

  private _filterDelegations(value: string){
    const filterValue = value.toLowerCase();

    return this.delegations.filter(option => option.libelle.toLowerCase().includes(filterValue));
  }
  private _filterPaymentFees(value: string){
    const filterValue = value.toLowerCase();

    return this.paymentFeesList.filter(option => option.libelle!.toLowerCase().includes(filterValue));
  }
}
