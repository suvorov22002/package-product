import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject } from 'rxjs';
import { Transaction } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
//import { createMintransReceipt } from 'src/app/shared/utils';
import { MintransReceiptDialogComponent } from '../../dialogs/mintrans-receipt-dialog/mintrans-receipt-dialog.component';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss']
})
export class PendingTransactionsComponent implements OnInit {

  @Input()  transactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  @Output() validateTransactionEvent = new EventEmitter<Transaction>()
  @Output() loadTransactionReceiptEvent = new EventEmitter<Transaction>()

  dataSource = new MatTableDataSource<Transaction>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['userCaisse', 'referenceBill', 
  'reason', 'typeJustificatif', 'amount', 
  
  'divisionAdministratif',
  'nomOperator', 'validfrom', 'libelleAgence', 'statusTrans',
   'actions'
  ]
  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.transactions$.subscribe((data) => this.dataSource.data = data)
  }
  onValidateTransaction(data: Transaction){
    this.validateTransactionEvent.emit(data)
  }
  onViewReceipt(data: Transaction){
    this.loadTransactionReceiptEvent.emit(data)
  }
  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
