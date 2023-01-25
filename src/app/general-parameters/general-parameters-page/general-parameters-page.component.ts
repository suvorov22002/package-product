import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralParameter } from 'src/app/shared/models';
import { GeneralParametersService } from 'src/app/shared/services/general-parameters.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { openSnackBar } from 'src/app/shared/utils';
import { CreateEditGeneralParametersDialogComponent } from '../dialogs/create-edit-general-parameters-dialog/create-edit-general-parameters-dialog.component';

@Component({
  selector: 'app-general-parameters-page',
  templateUrl: './general-parameters-page.component.html',
  styleUrls: ['./general-parameters-page.component.scss']
})
export class GeneralParametersPageComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<GeneralParameter>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'code', 'value',
    'description', 'actions'
  ]

  constructor(
    private generalParametersService: GeneralParametersService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.onLoadGeneralParameters()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }
  onLoadGeneralParameters(){
    this.generalParametersService.getAll().subscribe({
      next: (snapshot) => {
        this.dataSource.data = snapshot
      },
      error: (err) => {
        openSnackBar(this.snackbar, "Une erreur est survenue lors de la récupération des paramètres généraux !")
      }
    })
  }
  applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUpdateGeneralParameter(data: GeneralParameter){
    this.dialog.open(CreateEditGeneralParametersDialogComponent, {
      id: CreateEditGeneralParametersDialogComponent.id,
      data: {
        data,
        callback: () => this.onLoadGeneralParameters()
      }
    })
  }

  onCreateGeneralParameter(){
    this.dialog.open(CreateEditGeneralParametersDialogComponent, {
      id: CreateEditGeneralParametersDialogComponent.id,
      data: {
        callback: () => this.onLoadGeneralParameters()
      }
    })
  }

 

}
