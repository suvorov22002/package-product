import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Souscription } from 'src/app/shared/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewClientSubscriptionDialogComponent } from 'src/app/partners/mintrans/dialogs/new-client-subscription-dialog/new-client-subscription-dialog.component';
import { OperatorStatus } from 'src/app/shared/models/enums';
import { generateExcelFile, getDate, isEmpty, openSnackBar } from 'src/app/shared/utils';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { SouscriptionsService } from 'src/app/shared/services/souscriptions.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NewMarchandEnrollComponent } from '../../dialogs/new-marchand-enroll/new-marchand-enroll.component';
import { NewPingDialogComponent } from '../../dialogs/new-ping-dialog/new-ping-dialog.component';

@Component({
  selector: 'app-trustpay-abonnement',
  templateUrl: './trustpay-abonnement.component.html',
  styleUrls: ['./trustpay-abonnement.component.scss']
})
export class TrustpayAbonnementComponent implements OnInit {
  
  isFilteringAllSubscriptions = false
  souscriptions: Souscription[] = []

  dataSource = new MatTableDataSource<Souscription>(this.souscriptions);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'clientName', 'codeClient',
    'customerReferencePartner',
    'validFrom', 'utiunitiate', 'utivalidate',
    'datevalidate', 'agenceSous','operatorStatus', 'actions'
  ]
  filterFormGroup!: FormGroup
  isFiltering = false

  public get operatorsStatus()  {
    return Object.keys(OperatorStatus)
  }

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private partnersService: PartnersService,
    private authService: AuthService,
    private souscriptionsService: SouscriptionsService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.onLoadSouscriptions()

    this.filterFormGroup = new FormGroup({
      matricule: new FormControl(""),
      customerNamePartner: new FormControl(""),
      operatorStatus: new FormControl(OperatorStatus.WAITING),
      validto: new FormControl(new Date(), [Validators.required]),
      validfrom: new FormControl(new Date(), [Validators.required]),
    })

  }


  findSubscriberFromCBS(e: Event){

  }

  confirmAbonnement(){

  }

  onLoadSouscriptions(){
    this.souscriptionsService.getPartnerOperators(this.partnersService.curPartner.partcode!).subscribe({
      next: (data) => {
        if(isEmpty(data)){
          openSnackBar(this.snackbar, "Aucune souscription enregistrée !")
        }
        this.dataSource.data = data
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des souscriptions ! Nous allons re-éssayer")
        setTimeout(() => {
          this.onLoadSouscriptions()
        }, 5000);
      }
    })
  }

  onFilterSubscriptionsWithCriteria(){
    
    this.isFilteringAllSubscriptions = true
    this.souscriptionsService.filterSubscriptions(
      {
        ...this.filterFormGroup.value, 
        operatorStatus : this.filterFormGroup.get('operatorStatus')?.value == "" ? null :  this.filterFormGroup.get('operatorStatus')?.value
      }
    ).subscribe({
      next: (data) => {
        if(isEmpty(data)){
          openSnackBar(this.snackbar, "Aucune souscription retrouvée !")
        }
        this.dataSource.data = data
        this.isFilteringAllSubscriptions = false
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des souscriptions !")
        this.isFilteringAllSubscriptions = false
      }
    })

  }

  applySearchFilter(e: Event) {

  }

  openNewSubscriptionDialog(){
    this.dialog.open(NewMarchandEnrollComponent, {
      id: NewMarchandEnrollComponent.id,
      data: {
        subscriptionDoneCallback: () => this.onLoadSouscriptions()
      }
    })
  }

  openNewPinDialog() {
    this.dialog.open(NewPingDialogComponent, {
      id: NewPingDialogComponent.id,
      data: {
        subscriptionDoneCallback: () => this.onLoadSouscriptions()
      }
    })
  }

  onValidateSubscription(data: Souscription){
    data.utivalidate = this.authService.liferayUser.loginPortal
    
    this.souscriptionsService.validateSubscription(data)
    .subscribe({
      next: (snapshot) => {
        openSnackBar(this.snackbar, "La souscription a été validé")
        this. onLoadSouscriptions()
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.message)
        //openSnackBar(this.snackbar, "Une erreur est survenue lors de la validation de la souscription !")
      }
    })
  }

  onCancelSubscription(data: Souscription){
    data.uticancel = this.authService.liferayUser.loginPortal
    this.souscriptionsService.cancelSubscription(data)
    .subscribe({
      next: (snapshot) => {
        openSnackBar(this.snackbar, "La souscription a été annulé")
        this. onLoadSouscriptions()
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenue lors de l'annulation de la souscription !")
      }
    })
  }

  onEditSubscription(data: Souscription) {
    this.dialog.open(NewPingDialogComponent, {
      id: NewPingDialogComponent.id,
      data: {
        subscriptionDoneCallback: () => this.onLoadSouscriptions(),
        data
      }
    })
  }

  onDownloadReporting(){
    generateExcelFile(
      this.dataSource.data,
      ['Nom du partner', 'Code client', 'Nom du client', 'N° Contribuable / NUI', 'Comptes',],
      ['partnerName',  'codeClient', 'clientName', 'customerReferencePartner', 'txtAccounts', ],
      "REPORTING_TRANSACTIONS_"+getDate(new Date())
    )
  }

}
