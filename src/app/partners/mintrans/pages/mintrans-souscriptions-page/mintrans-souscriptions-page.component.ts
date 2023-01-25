import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Souscription } from 'src/app/shared/models';
import { OperatorStatus } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { SouscriptionsService } from 'src/app/shared/services/souscriptions.service';
import { generateExcelFile, getDate, isEmpty, openSnackBar } from 'src/app/shared/utils';
import { NewClientSubscriptionDialogComponent } from '../../dialogs/new-client-subscription-dialog/new-client-subscription-dialog.component';

@Component({
  selector: 'app-mintrans-souscriptions-page',
  templateUrl: './mintrans-souscriptions-page.component.html',
  styleUrls: ['./mintrans-souscriptions-page.component.scss']
})
export class MintransSouscriptionsPageComponent implements OnInit, AfterViewInit {

  isFilteringAllSubscriptions = false
  souscriptions: Souscription[] = []

  dataSource = new MatTableDataSource<Souscription>(this.souscriptions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'clientName', 'customerNamePartner',
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
    private authService: AuthService,
    private partnersService: PartnersService,
    private souscriptionsService: SouscriptionsService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>
    ) { 
      this._locale = 'fr';
      this._adapter.setLocale(this._locale);
    }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.onLoadSouscriptions()
    this.filterFormGroup = new FormGroup({
      customerReferencePartner: new FormControl(""),
      customerNamePartner: new FormControl(""),
      operatorStatus: new FormControl(OperatorStatus.WAITING),
      validto: new FormControl(new Date(), [Validators.required]),
      validfrom: new FormControl(new Date(), [Validators.required]),
    })
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

  openNewSubscriptionDialog(){
    this.dialog.open(NewClientSubscriptionDialogComponent, {
      id: NewClientSubscriptionDialogComponent.id,
      data: {
        subscriptionDoneCallback: () => this.onLoadSouscriptions()
      }
    })
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        openSnackBar(this.snackbar, error.error.error)
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

  onDownloadReporting(){
    generateExcelFile(
      this.dataSource.data,
      ['Nom du partner', 'Code client', 'Nom du client', 'N° Contribuable / NUI', 'Comptes',],
      ['partnerName',  'codeClient', 'clientName', 'customerReferencePartner', 'txtAccounts', ],
      "REPORTING_TRANSACTIONS_"+getDate(new Date())
    )
  }

}
