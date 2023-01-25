import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject } from 'rxjs';
import { PaymentServicesService } from 'src/app/shared/dangote-services/payment-services.service';
import { Transaction } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { isEmpty, openSnackBar } from 'src/app/shared/utils';
import { FilterTransactionParams } from '../../components/trustpay-all-transactions/trustpay-all-transactions.component';

@Component({
  selector: 'app-trustpay-transactions-page',
  templateUrl: './trustpay-transactions-page.component.html',
  styleUrls: ['./trustpay-transactions-page.component.scss']
})
export class TrustpayTransactionsPageComponent implements OnInit {

  isFilteringAllTransactions = false
  isFilteringMyTransactions = false
  allTransactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  pendingTransactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)
  myTransactions$: ReplaySubject<Transaction[]> = new ReplaySubject(1)

  pendingTransactionsLength = 0
 

  tfjIsPending = false
  
  constructor(
    private snackbar: MatSnackBar,
    private dangotePayService: PaymentServicesService,
    private partnersService: PartnersService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //this.onLoadTransactions()
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

  }

  onLoadTransactionReceipt(transaction: Transaction){

  }

}
