import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentFees } from 'src/app/shared/models';
import { PaymentFeesService } from 'src/app/shared/services/payment-fees.service';
import { isEmpty, openSnackBar } from 'src/app/shared/utils';
import { CreateEditPaymentFeesDialogComponent } from '../../dialogs/create-edit-payment-fees-dialog/create-edit-payment-fees-dialog.component';

@Component({
  selector: 'app-payment-fees-config',
  templateUrl: './payment-fees-config.component.html',
  styleUrls: ['./payment-fees-config.component.scss']
})
export class PaymentFeesConfigComponent implements OnInit, AfterViewInit {

  constructor(
    private paymentFeesService: PaymentFeesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  dataSource = new MatTableDataSource<PaymentFees>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = [
    'code', 'libelle',
    'categorie', 'amount', 
    'actions'
  ]

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.onLoadPaymentFees()
  }

  onLoadPaymentFees(){
    this.paymentFeesService.getAll().subscribe({
      next: (snapshot) => {
        if(isEmpty(snapshot)){
          openSnackBar(this.snackbar, "Aucun type de libellé enregistré!")
        }
        this.dataSource.data = snapshot
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des libellés ! ")
      }
    })
  }
  onUpdatePaymentFees(data: PaymentFees){
    this.dialog.open(CreateEditPaymentFeesDialogComponent, {
      id: CreateEditPaymentFeesDialogComponent.id,
      data: {
        data,
        callback: () => this.onLoadPaymentFees()
      }
    })
  }

  onActiveOrNotPaymentFees(data: PaymentFees, actif: boolean){
    this.paymentFeesService.update({
      ...data,
      actif
      
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, `${actif ? 'Activation' : 'Désactivation'} effectuée !`)
        this.onLoadPaymentFees()
      },
      error: () => {
        openSnackBar(this.snackbar, `Une erreur est survenue lors de ${actif ? 'l\'activation' : 'la désactivation'} !`)
      }
    })
  }

  onCreatePaymentFees(){
    this.dialog.open(CreateEditPaymentFeesDialogComponent, {
      id: CreateEditPaymentFeesDialogComponent.id,
      data: {
        callback: () => this.onLoadPaymentFees()
      }
    })
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
