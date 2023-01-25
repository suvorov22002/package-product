import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ReplaySubject } from 'rxjs';
import { Transaction } from 'src/app/shared/models';
import { TransactionStatus } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { errorStatusToMessageMapper, errorStatutResolver, generateExcelFile, getDate, openSnackBar, getDateToString } from 'src/app/shared/utils';
import { DangoteReceiptViewerDialogComponent } from '../../dialogs/dangote-receipt-viewer-dialog/dangote-receipt-viewer-dialog.component';


export interface FilterTransactionParams{
  startDate: string,
  endDate: string,
  transaction: Transaction
}


@Component({
  selector: 'app-dangote-all-transactions',
  templateUrl: './dangote-all-transactions.component.html',
  styleUrls: ['./dangote-all-transactions.component.scss']
})
export class DangoteAllTransactionsComponent implements OnInit, AfterViewInit {

  @Input()  transactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  @Input()  isFiltering = false

  @Output() validateTransactionEvent = new EventEmitter<Transaction>()
  @Output() filterTransactionEvent = new EventEmitter<FilterTransactionParams>()
  @Output() loadTransactionReceiptEvent = new EventEmitter<Transaction>()
  @Output() loadTfjEvent = new EventEmitter()


  filterFormGroup!: FormGroup

  
  dataSource = new MatTableDataSource<Transaction>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public get transactionsStatus() {
    return Object.keys(TransactionStatus).filter(o => o != 'ENCAISSEE')
  }

  displayedColumns = ['referenceBill', 
  'reason', 'amount', 
  
  'divisionAdministratif',
  'nomMarchand', 'referenceOperator', 'validfrom', 'libelleAgence', 'statusTrans', 
   'actions'
  ]
  
  constructor(
    private authService: AuthService,
    private partnersService: PartnersService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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
    })

    this.transactions$.subscribe((data) => this.dataSource.data = data)
    
  }

  onFilterTransactionsWithCriteria(){
    const params: FilterTransactionParams = {
      startDate: getDateToString(this.filterFormGroup.get('validfrom')?.value),
      endDate: getDateToString(this.filterFormGroup.get('validto')?.value),
      transaction: {
        ...this.filterFormGroup.value,
        statusTrans : this.filterFormGroup.get('statusTrans')?.value == "" ? null :  this.filterFormGroup.get('statusTrans')?.value
      }
    }
    this.filterTransactionEvent.emit(params)
  }

  onLoadTfj(){
    this.loadTfjEvent.emit()
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDownloadReporting(){
    var compteur = 1;
    this.dataSource.data.forEach(d => {
      d.id = (compteur++).toString();
    });

    generateExcelFile(
      this.dataSource.data.map(e => {
        e.validfrom = moment(e.validfrom).format('LLL')
        e.dateConfirmation = e.dateConfirmation ? moment(e.dateConfirmation).format('LLL') : e.dateConfirmation
        return e
      }),
      [
        'N°', 'ID MARCHAND', 'NOM MARCHAND', 'NUMERO EVE', 
        'REFERENCE', 'DATE OPERATION', 'DATE COMPTABLE', 'MONTANT VERSEMENT', 
        "COMPTE CREDITE", 'STATUT', 'TELEPHONE',
        'PARTIE VERSANTE', 'UTI CAISSE'
      ],
      [
        'id','idMarchand','nomMarchand', 'eveid', 'reference', 
        'validfrom', 'dateConfirmation',
        'amount', 'accountCredit', 'statusTrans', 'telephone', 'partieVersante',
        'userCaisse'
      ],
      "LISTE_TRANSACTIONS_"+getDate(new Date())
    )
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

  onDelete(event: Event) {
    
  }

}
