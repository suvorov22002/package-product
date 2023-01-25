import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { TypeOfFees } from 'src/app/shared/models';
import { TypeOfFeesService } from 'src/app/shared/services/type-of-fees.service';
import { isEmpty, openSnackBar } from 'src/app/shared/utils';
import { CreateEditTypeOfFeesDialogComponent } from '../../dialogs/create-edit-type-of-fees-dialog/create-edit-type-of-fees-dialog.component';

@Component({
  selector: 'app-type-of-fees-config',
  templateUrl: './type-of-fees-config.component.html',
  styleUrls: ['./type-of-fees-config.component.scss']
})
export class TypeOfFeesConfigComponent implements OnInit, AfterViewInit {

  constructor(
    private typeOfFeesService: TypeOfFeesService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  dataSource = new MatTableDataSource<TypeOfFees>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = [
    'code', 'libelle',
    'segment', 'actions'
  ]

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.onLoadTypeOfFees()
  }

  onLoadTypeOfFees(){
    this.typeOfFeesService.getAll().subscribe({
      next: (snapshot) => {
        if(isEmpty(snapshot)){
          openSnackBar(this.snackbar, "Aucun type de redevance enregistré!")
        }
        this.dataSource.data = snapshot
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des types de redevances ! ")
      }
    })
  }
  onUpdateTypeOfFees(data: TypeOfFees){
    this.dialog.open(CreateEditTypeOfFeesDialogComponent, {
      id: CreateEditTypeOfFeesDialogComponent.id,
      data: {
        data,
        callback: () => this.onLoadTypeOfFees()
      }
    })
  }

  onCreateTypeOfFees(){
    this.dialog.open(CreateEditTypeOfFeesDialogComponent, {
      id: CreateEditTypeOfFeesDialogComponent.id,
      data: {
        callback: () => this.onLoadTypeOfFees()
      }
    })
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onActiveOrNotTypeOfFees(data: TypeOfFees, actif: boolean){
    this.typeOfFeesService.update({
      ...data,
      actif
      
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, `${actif ? 'Activation' : 'Désactivation'} effectuée !`)
        this.onLoadTypeOfFees()
      },
      error: () => {
        openSnackBar(this.snackbar, `Une erreur est survenue lors de ${actif ? 'l\'activation' : 'la désactivation'} !`)
      }
    })
  }

}
