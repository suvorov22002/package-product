import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject } from 'rxjs';
import { Transaction } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getDateToString } from 'src/app/shared/utils';

export interface FilterTransactionParams{
  startDate: string,
  endDate: string,
  transaction: Transaction
}

@Component({
  selector: 'app-trustpay-all-transactions',
  templateUrl: './trustpay-all-transactions.component.html',
  styleUrls: ['./trustpay-all-transactions.component.scss']
})
export class TrustpayAllTransactionsComponent implements OnInit {

  @Input()  transactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  @Input()  isFiltering = false

  @Output() validateTransactionEvent = new EventEmitter<Transaction>()
  @Output() filterTransactionEvent = new EventEmitter<FilterTransactionParams>()
  @Output() loadTransactionReceiptEvent = new EventEmitter<Transaction>()
  @Output() loadTfjEvent = new EventEmitter()

  filterFormGroup!: FormGroup

  dataSource = new MatTableDataSource<Transaction>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
  'typeTransaction', 'reference','date',
  'montant', 'comm', 'taxe', 'statut', 'motif', 
   'client', 'telephone', 'compted', 'comptec'
  ]

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.filterFormGroup = new FormGroup({
      ncp: new FormControl(""),
      tel: new FormControl(""),
      customer: new FormControl(this.authService.liferayUser.codeAge),
      validfrom: new FormControl(new Date(), [Validators.required]),
      validto: new FormControl(new Date(), [Validators.required]),
    })

    this.transactions$.subscribe((data) => this.dataSource.data = data)
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

}
