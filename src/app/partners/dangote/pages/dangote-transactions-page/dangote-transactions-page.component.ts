import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject } from 'rxjs';
import { FilterTransactionParams } from 'src/app/partners/mintrans/components/all-transactions/all-transactions.component';
import { PaymentServicesService } from 'src/app/shared/dangote-services/payment-services.service';
import { Transaction } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import { openSnackBar, errorStatutResolver, errorStatusToMessageMapper, isEmpty } from 'src/app/shared/utils';
import { DangoteConfirmPayInDialogComponent } from '../../dialogs/dangote-confirm-pay-in-dialog/dangote-confirm-pay-in-dialog.component';
import { DangoteReceiptViewerDialogComponent } from '../../dialogs/dangote-receipt-viewer-dialog/dangote-receipt-viewer-dialog.component';

@Component({
  selector: 'app-dangote-transactions-page',
  templateUrl: './dangote-transactions-page.component.html',
  styleUrls: ['./dangote-transactions-page.component.scss']
})
export class DangoteTransactionsPageComponent implements OnInit {

  isFilteringAllTransactions = false
  isFilteringMyTransactions = false
  allTransactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  pendingTransactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  myTransactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)

  pendingTransactionsLength = 0
 

  tfjIsPending = false
  
  constructor(private snackbar: MatSnackBar,
    private dangotePayService: PaymentServicesService,
    private transactionService: TransactionsService,
    private partnersService: PartnersService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.onLoadTransactions()
    this.onLoadPendingTransactions()
  }

  onLoadTransactions(){
    this.dangotePayService.getAllTransactions( 
      this.partnersService.curPartner
      ).subscribe({
        next: (data) => {
          if(isEmpty(data)){
            openSnackBar(this.snackbar, "Aucune transaction enregistrée !")
          }
          this.allTransactions$.next(data)
        },
        error: () => {
          openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des transactions ! Nous allons re-éssayer")
          setTimeout(() => {
            this.onLoadTransactions()
          }, 5000);
        }
    })
  }

  

  onFilterTransactionsWithCriteria(params: FilterTransactionParams){
    this.isFilteringAllTransactions = true
    console.log(JSON.stringify(params))
    this.dangotePayService.filterTransactionsWithCriteria(this.partnersService.curPartner,
     params.transaction,params.startDate,params.endDate 
    ).subscribe({
      next: (data) => {
        if(isEmpty(data)){
          openSnackBar(this.snackbar, "Aucune transaction retrouvée !")
        }
        this.allTransactions$.next(data)
        this.isFilteringAllTransactions = false
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des transactions !")
        this.isFilteringAllTransactions = false
      }
    })
  }

  onFilterMyTransactionsWithCriteria(params: FilterTransactionParams){
    this.isFilteringAllTransactions = true
    //console.log(JSON.stringify(params))
    this.dangotePayService.filterTransactionsWithCriteria(this.partnersService.curPartner,
     params.transaction,params.startDate,params.endDate 
    ).subscribe({
      next: (data) => {
        if(isEmpty(data)){
          openSnackBar(this.snackbar, "Aucune transaction retrouvée !")
        }
        this.myTransactions$.next(data)
        this.isFilteringMyTransactions = false
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des transactions !")
        this.isFilteringMyTransactions = false
      }
    })
  }

  

  onInitiateTransactionValidation(transaction: Transaction){
    this.dialog.open(DangoteConfirmPayInDialogComponent, {
      data: {
        transaction,
        callbackAction: (transaction: Transaction) => this.onValidateTransaction(transaction)
      }
    })
  }
  onValidateTransaction(data: Transaction){
    openSnackBar(this.snackbar, "Validation de la transaction en cours !")
    this.dangotePayService.validateTransaction(this.partnersService.curPartner, data)
    .subscribe({
      next: (snapshot) => {
        if(snapshot.reponseCode !== '200') {
          openSnackBar(this.snackbar, "Une erreur est survenue lors de la validation de la transaction ! \n"+ snapshot.errorMessage)
          return
        }
        openSnackBar(this.snackbar, "La transaction a été validé")
        // Update
        this.onLoadTransactions()
        this.onLoadPendingTransactions()
      },
      error: (err: HttpErrorResponse) => {
        const errorType = err.error.message.split(':')[1]
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la validation de la transaction ! "+ errorType)
      }
    })
  }

  onLoadPendingTransactions(){
    this.dangotePayService.findPendingTransactions(this.partnersService.curPartner, 
      this.authService.liferayUser.loginPortal
    ).subscribe({
      next: (data) => {
        this.pendingTransactions$.next(data)
        this.pendingTransactionsLength = data.length
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des transactions en suspens ! Nous allons ré-essayer")
        setTimeout(() => {
          this.onLoadPendingTransactions()
        }, 5000);
      }
    })
  }

  onLoadTransactionReceipt(transaction: Transaction){
    openSnackBar(this.snackbar, "Impression en cours ...")
    this.dialog.open(DangoteReceiptViewerDialogComponent, {
      data: transaction
    })
    
  }

  onLoadTfj(){/*
    this.tfjIsPending = true
    const partnerName = this.partnersService.curPartner.partname!
    const cuti = this.authService.cashierCode
    this.dangotePayService.loadTFJRecap(partnerName, cuti).subscribe({
      next: () => {
        this.tfjIsPending = false
        openSnackBar(this.snackbar, "Le TFJ a été éffectué !")
      },
      error: (error: HttpErrorResponse) => {
        this.tfjIsPending = false
        const errorStatus = errorStatutResolver(error.error.error)
        const message = errorStatusToMessageMapper[errorStatus.trim()]
        openSnackBar(this.snackbar, "Une erreur est survenue lors du TFJ. "+message)
      }
    })*/
  }

}
