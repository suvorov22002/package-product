import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Versement } from 'src/app/shared/models';

@Component({
  selector: 'app-dangote-pay-in-recap-dialog',
  templateUrl: './dangote-pay-in-recap-dialog.component.html',
  styleUrls: ['./dangote-pay-in-recap-dialog.component.scss']
})
export class DangotePayInRecapDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public cashIn: Versement) { }

  ngOnInit(): void {
  }

}
