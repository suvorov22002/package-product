import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, AfterViewInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';
import { Transaction } from 'src/app/shared/models';
import { TransactionStatus } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { errorStatusToMessageMapper, errorStatutResolver, generateExcelFile, getDate, openSnackBar } from 'src/app/shared/utils';


export interface FilterTransactionParams{
  startDate: string,
  endDate: string,
  transaction: Transaction
}

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit, AfterViewInit {


  @Input()  transactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  @Input()  isFiltering = false

  @Output() validateTransactionEvent = new EventEmitter<Transaction>()
  @Output() filterTransactionEvent = new EventEmitter<FilterTransactionParams>()
  @Output() loadTransactionReceiptEvent = new EventEmitter<Transaction>()
  @Output() cancelTransactionEvent = new EventEmitter<Transaction>()
  @Output() loadTfjEvent = new EventEmitter()


  
  filterFormGroup!: FormGroup

  
  dataSource = new MatTableDataSource<Transaction>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
  'userCaisse','referenceBill', 
  'reason', 'typeJustificatif', 'amount', 
  'divisionAdministratif',
  'nomOperator', 'referenceOperator', 'validfrom', 'libelleAgence', 'statusTrans', 
   'actions'
  ]

  public get transactionsStatus() {
    return Object.keys(TransactionStatus)
  }

  
  canCancelTransaction(status: TransactionStatus)  {
    return (status != TransactionStatus.CANCEL
         && status != TransactionStatus.INVALID 
         && status != TransactionStatus.ERROR 
         //&& status != TransactionStatus.FAILED 
         && status != TransactionStatus.SUCCESS
         )
  }
  

  constructor(
    private authService: AuthService,
    private partnersService: PartnersService,
    
    private snackbar: MatSnackBar,
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
    
    this.filterFormGroup = new FormGroup({
      partnerTrxID: new FormControl(""),
      nomOperator: new FormControl(""),
      ageCaisse: new FormControl(this.authService.liferayUser.codeAge),
      reason: new FormControl(""),
      statusTrans: new FormControl(TransactionStatus.PROCESSING), 
      validfrom: new FormControl(new Date(), [Validators.required]),
      validTo: new FormControl(new Date(), [Validators.required]),
    })

    this.transactions$.subscribe((data) => this.dataSource.data = data)
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onValidateTransaction(data: Transaction){
    this.validateTransactionEvent.emit(data)
  }

  onFilterTransactionsWithCriteria(){
    // TODO : Trigger Event with data
    const params: FilterTransactionParams = {
      startDate: getDate(this.filterFormGroup.get('startDate')?.value),
      endDate: getDate(this.filterFormGroup.get('endDate')?.value),
      transaction: {
        ...this.filterFormGroup.value,
        statusTrans : this.filterFormGroup.get('statusTrans')?.value == "" ? null :  this.filterFormGroup.get('statusTrans')?.value
      }
    }
    this.filterTransactionEvent.emit(params)
      
  }

  onViewReceipt(data: Transaction){
    this.loadTransactionReceiptEvent.emit(data);
  }

  onDownloadReporting(){
    generateExcelFile(
      this.dataSource.data.map(e => {
        e.validfrom = moment(e.validfrom).format('LLL')
        e.dateConfirmation = e.dateConfirmation ? moment(e.dateConfirmation).format('LLL') : e.dateConfirmation
        return e
      }),
      [
        'N° Référence', 'Libellé paiement', 'Montant', 'Type de redevance', 
        'Catégorie', 'Département', 'Nom & Prénom', 'N° Contribuable / NIU', 
        "Secteur d'activité / Profession", 'Statut de la transaction', 'Détails',
        'Date de paiement', 'Agence Guichet', 'Guichetier',
         "N° d'évènement", "Agent MINTRANSPORT", "Date de confirmation", 'Motif de rejet'
      ],
      [
        'referenceBill','reason', 'amount', 'typeJustificatif', 
        'categorieJustificatif', 'divisionAdministratif',
        'nomOperator', 'referenceOperator', 'activity', 'statusTrans', 'details',
        'validfrom', 'libelleAgence', 'userCaisse', 'eveid', 
        'userConfirmation', 'dateConfirmation', 'errorsMsg'
      ],
      "REPORTING_TRANSACTIONS_"+getDate(new Date())
    )
  }

  onLoadTfj(){
    this.loadTfjEvent.emit()
  }

  onCancelTransaction(transaction: Transaction){
    this.cancelTransactionEvent.emit(transaction)
  }

}
