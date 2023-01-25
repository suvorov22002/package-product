import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction, Versement } from 'src/app/shared/models';

export interface TransactionRecapActionDialogParam{
  transaction: Transaction,
  callbackAction : (t: Transaction) => void
}

@Component({
  selector: 'app-transaction-confirm-validation-recap-dialog',
  templateUrl: './transaction-confirm-validation-recap-dialog.component.html',
  styleUrls: ['./transaction-confirm-validation-recap-dialog.component.scss']
})
export class TransactionConfirmValidationRecapDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransactionRecapActionDialogParam
  ) { }

  
  public get transaction() {
    return this.data.transaction
  }
  

  ngOnInit(): void {
  }

  onAction(){
    this.data.callbackAction(this.transaction)
  }
}
