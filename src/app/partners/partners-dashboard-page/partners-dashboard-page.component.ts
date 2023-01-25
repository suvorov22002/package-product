import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Partner } from 'src/app/shared/models';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { isEmpty, openSnackBar, partnerCodeNamespaceMappper } from 'src/app/shared/utils';
import { CreatePartnerDialogComponent } from '../mintrans/dialogs/create-partner-dialog/create-partner-dialog.component';
import { EditPartnerDialogComponent } from '../mintrans/dialogs/edit-partner-dialog/edit-partner-dialog.component';

@Component({
  selector: 'app-partners-dashboard-page',
  templateUrl: './partners-dashboard-page.component.html',
  styleUrls: ['./partners-dashboard-page.component.scss']
})
export class PartnersDashboardPageComponent implements OnInit {

  constructor(private partnersService: PartnersService,
    private dialogService: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
    ) { }

  
  private _partners: Partner[] = []


  dataSource = new MatTableDataSource<Partner>(this.partners);

  public get partners() : Partner[] {
    return this._partners
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['partname', 'partcode',
  'actions'
]


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }
  
  ngOnInit(): void {
    this.onLoadPartners()
  }

  onLoadPartners(){
    openSnackBar(this.snackbar, "Chargement des partenaires !", "OK", 5000)
    this.partnersService.getAllPartners().subscribe({
      next: (data) => {
        if(isEmpty(data)){
          openSnackBar(this.snackbar, "Aucune partenaire enregistrée !")
        }
        this._partners = data
        this.dataSource.data = data
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des partenaires ! Nous allons re-éssayer")
        setTimeout(() => {
          this.onLoadPartners()
        }, 5000);
      }
    })
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onFilterPartners(){

  }

  onCreatePartner(){
    this.dialogService.open(CreatePartnerDialogComponent, {
      id: CreatePartnerDialogComponent.id,
      data: {}
    })
  }

  onPartnerClicked(partner: Partner){
    this.partnersService.curPartner = partner
    localStorage.setItem(PartnersService.CUR_PARTNER_STORAGE_KEY, JSON.stringify(this.partnersService.curPartner))
    const namespace = partnerCodeNamespaceMappper[partner.partcode as string]
    if(namespace){
      this.router.navigateByUrl(`/${namespace}-dashboard`)
    }
  }

  onEditPartner(partner: Partner){
    this.dialogService.open(EditPartnerDialogComponent, {
      id: CreatePartnerDialogComponent.id,
      data: {
        data: partner,
        callback: () => this.onLoadPartners()
      }
    })
  }

 
}
