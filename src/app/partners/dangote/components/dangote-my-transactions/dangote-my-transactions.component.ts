import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject } from 'rxjs';
import * as moment from 'moment';
import { Transaction } from 'src/app/shared/models';
import { TransactionStatus } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getDateToString, openSnackBar } from 'src/app/shared/utils';
import { DangoteReceiptViewerDialogComponent } from '../../dialogs/dangote-receipt-viewer-dialog/dangote-receipt-viewer-dialog.component';
import { FilterTransactionParams } from '../dangote-all-transactions/dangote-all-transactions.component';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentServicesService } from 'src/app/shared/dangote-services/payment-services.service';

@Component({
  selector: 'app-dangote-my-transactions',
  templateUrl: './dangote-my-transactions.component.html',
  styleUrls: ['./dangote-my-transactions.component.scss']
})
export class DangoteMyTransactionsComponent implements OnInit, AfterViewInit {

  @Input()  transactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  @Input()  isFiltering = false

  @Output() validateTransactionEvent = new EventEmitter<Transaction>()
  @Output() filterMyTransactionEvent = new EventEmitter<FilterTransactionParams>()
  @Output() loadTransactionReceiptEvent = new EventEmitter<Transaction>()

  filterFormGroup!: FormGroup
  
  dataSource = new MatTableDataSource<Transaction>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public get transactionsStatus() {
    return Object.keys(TransactionStatus)
  }

  displayedColumns = ['referenceBill', 
  'reason', 'amount', 
  
  'divisionAdministratif',
  'nomMarchand', 'referenceOperator', 'validfrom', 'libelleAgence', 'statusTrans', 
   'actions'
  ]

  rapDate : any

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
    private partnersService: PartnersService,
    private dangotePayService: PaymentServicesService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.filterFormGroup = new FormGroup({
      idMarchand: new FormControl(""),
      nomMarchand: new FormControl(""),
      ageCaisse: new FormControl(this.authService.liferayUser.codeAge),
      userCaisse:new FormControl(""),
      eveid: new FormControl(""),
      statusTrans: new FormControl(TransactionStatus.PROCESSING), 
      validfrom: new FormControl(new Date(), [Validators.required]),
      validto: new FormControl(new Date(), [Validators.required]),
      rapportDate: new FormControl(new Date(), [Validators.required])
    })

    this.transactions$.subscribe((data) => this.dataSource.data = data)
  }

  onFilterTransactionsWithCriteria(){
    const params: FilterTransactionParams = {
      startDate: getDateToString(this.filterFormGroup.get('validfrom')?.value),
      endDate: getDateToString(this.filterFormGroup.get('validto')?.value),
      transaction: {
        ...this.filterFormGroup.value,
        statusTrans : this.filterFormGroup.get('statusTrans')?.value == "" ? null :  this.filterFormGroup.get('statusTrans')?.value,
        userCaisse: this.authService.liferayUser.codeAge
      }
    }
    this.filterMyTransactionEvent.emit(params)
  }

  onValidateTransaction(data: Transaction){
    this.validateTransactionEvent.emit(data)
  }
  onViewReceipt(data: Transaction){
    //this.loadTransactionReceiptEvent.emit(data);
    this.dialog.open(DangoteReceiptViewerDialogComponent, {
      data: data.reportdata
    })
  }
  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDownloadReporting(){

  }

  onDownloadRapport() {

    var date = moment(this.filterFormGroup.get('rapportDate')?.value).format('DDMMYYYY')
    
      this.dangotePayService.generateRapport(this.partnersService.curPartner, date, this.authService.liferayUser.codeAge
        ).subscribe({
          next: (data) => {
            console.log('report jour: '+data)
            this.dialog.open(DangoteReceiptViewerDialogComponent, {
              data: data.data
            })
          },
          error: () => {
            openSnackBar(this.snackbar, "Une erreur est survenue lors de la generation du rapport")
           
          }
      })
  }

}
