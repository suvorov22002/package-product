import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject } from 'rxjs';
import { Transaction } from 'src/app/shared/models';
import { TransactionStatus } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { errorStatusToMessageMapper, errorStatutResolver, getDate, isEmpty, openSnackBar } from 'src/app/shared/utils';
import { FilterTransactionParams } from '../../components/all-transactions/all-transactions.component';
import { CancelTransactionDialogComponent } from '../../dialogs/cancel-transaction-dialog/cancel-transaction-dialog.component';
import { TransactionConfirmValidationRecapDialogComponent } from '../../dialogs/transaction-confirm-validation-recap-dialog/transaction-confirm-validation-recap-dialog.component';



@Component({
  selector: 'app-mintrans-transactions-page',
  templateUrl: './mintrans-transactions-page.component.html',
  styleUrls: ['./mintrans-transactions-page.component.scss']
})
export class MintransTransactionsPageComponent implements OnInit {


  isFilteringAllTransactions = false
  allTransactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  pendingTransactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)

  pendingTransactionsLength = 0

  tfjIsPending = false
  

  constructor(
    private snackbar: MatSnackBar,
    private transactionService: TransactionsService,
    private partnersService: PartnersService,
    private authService: AuthService,
    private dialog: MatDialog
    ) { }

  
  
  
  

  
  ngOnInit(): void {
    this.onLoadTransactions()
    this.onLoadPendingTransactions()
    
  }

  onLoadTransactions(){
    
    this.transactionService.getAllPartnerTransactions( 
      this.partnersService.curPartner.partcode!
      ).subscribe({
        next: (data) => {
          if(isEmpty(data)){
            openSnackBar(this.snackbar, "Aucune transaction enregistrée !")
          }
          this.allTransactions$.next(data)
        },
        error: (error: HttpErrorResponse) => {
          openSnackBar(this.snackbar, error.error.error)
          //openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des transactions ! Nous allons re-éssayer")
          setTimeout(() => {
            this.onLoadTransactions()
          }, 5000);
        }
    })
  }

  

  onFilterTransactionsWithCriteria(params: FilterTransactionParams){
    this.isFilteringAllTransactions = true
    
    this.transactionService.filterTransactionsWithCriteria(
     params.transaction
    ).subscribe({
      next: (data) => {
        if(isEmpty(data)){
          openSnackBar(this.snackbar, "Aucune transaction retrouvée !")
        }
        this.allTransactions$.next(data)
        this.isFilteringAllTransactions = false
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des transactions !")
        this.isFilteringAllTransactions = false
      }
    })
  }

  onInitiateTransactionValidation(transaction: Transaction){
    this.dialog.open(TransactionConfirmValidationRecapDialogComponent, {
      data: {
        transaction,
        callbackAction: (transaction: Transaction) => this.onValidateTransaction(transaction)
      }
    })
  }
  onValidateTransaction(data: Transaction){
    openSnackBar(this.snackbar, "Validation de la transaction en cours !")
    this.transactionService.validateTransaction(data)
    .subscribe({
      next: (snapshot) => {
        openSnackBar(this.snackbar, "La transaction a été validé")
        // Update
        this.onLoadTransactions()
        this.onLoadPendingTransactions()
      },
      error: (error: HttpErrorResponse) => {
        /* const errorType = err.error.message.split(':')[1]
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la validation de la transaction ! "+ errorType) */
        openSnackBar(this.snackbar, error.error.error)
      }
    })
  }

  onLoadPendingTransactions(){
    this.transactionService.loadPendingTransactions(
      this.authService.liferayUser.loginPortal
    ).subscribe({
      next: (data) => {
        this.pendingTransactions$.next(data.datas)
        this.pendingTransactionsLength = data.datas.length
      },
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des transactions en suspens ! Nous allons ré-essayer")
        setTimeout(() => {
          this.onLoadPendingTransactions()
        }, 5000);
      }
    })
  }

  onLoadTransactionReceipt(transaction: Transaction){
    openSnackBar(this.snackbar, "Impression en cours ...")
    this.transactionService.loadMintransReceipt(transaction)
    .subscribe({
      next: (value) => {},
      error: (error: HttpErrorResponse) => {
        openSnackBar(this.snackbar, error.error.error)
        //openSnackBar(this.snackbar, "Une erreur est survenue lors de l'impression du reçu.")
      }
    })
  }

  onLoadTfj(){
    this.tfjIsPending = true
    const partnerName = this.partnersService.curPartner.partname!
    const cuti = this.authService.liferayUser.loginPortal
    this.transactionService.loadTFJRecap(partnerName, cuti).subscribe({
      next: () => {
        this.tfjIsPending = false
        openSnackBar(this.snackbar, "Le TFJ a été éffectué !")
      },
      error: (error: HttpErrorResponse) => {
        this.tfjIsPending = false
        /* const errorStatus = errorStatutResolver(error.error.error)
        const message = errorStatusToMessageMapper[(errorStatus ?? "").trim()] */
        openSnackBar(this.snackbar, error.error.error)
      }
    })
  }

  onCancelTransaction(transaction: Transaction){
    this.dialog.open(CancelTransactionDialogComponent, {
      id: CancelTransactionDialogComponent.id,
      data: {
        data: transaction,
        callback: () => {
          this.dialog.getDialogById(CancelTransactionDialogComponent.id)?.close()
          this.onLoadTransactions()
          this.onLoadPendingTransactions()
        }
      }
    })
  }

}
