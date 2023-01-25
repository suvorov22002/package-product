import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { isEmpty, ReplaySubject } from 'rxjs';
import { PaymentServicesService } from 'src/app/shared/dangote-services/payment-services.service';
import { DangoteMerchantData } from 'src/app/shared/models';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { openSnackBar } from 'src/app/shared/utils';

@Component({
  selector: 'app-dangote-list-marchands',
  templateUrl: './dangote-list-marchands.component.html',
  styleUrls: ['./dangote-list-marchands.component.scss']
})
export class DangoteListMarchandsComponent implements OnInit, AfterViewInit {

  allMerchant$: ReplaySubject<DangoteMerchantData[]> = new ReplaySubject(1)

  filterFormGroup!: FormGroup

  dataSource = new MatTableDataSource<DangoteMerchantData>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['referenceOperator',
    'nomMarchand'
  ]
  
  constructor(
    private snackbar: MatSnackBar,
    private partnersService: PartnersService,
    private dangotePayService: PaymentServicesService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {

    this.filterFormGroup = new FormGroup({
      idMarchand: new FormControl(""),
      nomMarchand: new FormControl("")
    })

    this.loadAllMerchants()

    this.allMerchant$.subscribe((data) => this.dataSource.data = data)

  }

  onFilterMerchantWithCriteria() {

  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadAllMerchants() {
    this.dangotePayService.findAllMerchant( 
      this.partnersService.curPartner
      ).subscribe({
        next: (data) => {
          this.allMerchant$.next(data)
        },
        error: () => {
          openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des marchands ! Nous allons re-éssayer")
          setTimeout(() => {
            this.loadAllMerchants()
          }, 5000);
        }
    })
  }

}
