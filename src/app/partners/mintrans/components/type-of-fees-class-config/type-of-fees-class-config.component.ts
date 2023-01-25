import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TypeOfFeesClass } from 'src/app/shared/models';
import { TypeOfFeesClassService } from 'src/app/shared/services/type-of-fees-class.service';
import { isEmpty, openSnackBar } from 'src/app/shared/utils';
import { CreateEditTypeOfFeesClassDialogComponent } from '../../dialogs/create-edit-type-of-fees-class-dialog/create-edit-type-of-fees-class-dialog.component';

@Component({
  selector: 'app-type-of-fees-class-config',
  templateUrl: './type-of-fees-class-config.component.html',
  styleUrls: ['./type-of-fees-class-config.component.scss']
})
export class TypeOfFeesClassConfigComponent implements OnInit {

  constructor(
    private typeOfFeesClassService: TypeOfFeesClassService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  dataSource = new MatTableDataSource<TypeOfFeesClass>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = [
    'code', 'libelle',
    'typeForfait', 'actions'
  ]

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.onLoadTypeOfFeesClass()
  }

  onLoadTypeOfFeesClass(){
    this.typeOfFeesClassService.getAll().subscribe({
      next: (snapshot) => {
        if(isEmpty(snapshot)){
          openSnackBar(this.snackbar, "Aucune catégorie enregistré!")
        }
        this.dataSource.data = snapshot
      },
      error: () => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des catégories ! ")
      }
    })
  }
  onUpdateTypeOfFeesClass(data: TypeOfFeesClass){
    this.dialog.open(CreateEditTypeOfFeesClassDialogComponent, {
      id: CreateEditTypeOfFeesClassDialogComponent.id,
      data: {
        data,
        callback: () => this.onLoadTypeOfFeesClass()
      }
    })
  }

  onCreateTypeOfFeesClass(){
    this.dialog.open(CreateEditTypeOfFeesClassDialogComponent, {
      id: CreateEditTypeOfFeesClassDialogComponent.id,
      data: {
        callback: () => this.onLoadTypeOfFeesClass()
      }
    })
  }

  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onActiveOrNotTypeOfFeesClass(data: TypeOfFeesClass, actif: boolean){
    this.typeOfFeesClassService.update({
      ...data,
      actif
      
    }).subscribe({
      next: () => {
        openSnackBar(this.snackbar, `${actif ? 'Activation' : 'Désactivation'} effectuée !`)
        this.onLoadTypeOfFeesClass()
      },
      error: () => {
        openSnackBar(this.snackbar, `Une erreur est survenue lors de ${actif ? 'l\'activation' : 'la désactivation'} !`)
      }
    })
  }
}
