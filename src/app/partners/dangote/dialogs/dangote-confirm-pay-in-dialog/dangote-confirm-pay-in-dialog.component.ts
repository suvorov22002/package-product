import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/shared/models';

@Component({
  selector: 'app-dangote-confirm-pay-in-dialog',
  templateUrl: './dangote-confirm-pay-in-dialog.component.html',
  styleUrls: ['./dangote-confirm-pay-in-dialog.component.scss']
})
export class DangoteConfirmPayInDialogComponent implements OnInit {

  public cashIn!: Transaction;

  constructor(@Inject(MAT_DIALOG_DATA) public trxIn: any) { }

  public get transaction() {
    return this.trxIn.transaction
  }

  ngOnInit(): void {
    //console.log("cashin: "+JSON.stringify(this.trxIn.transaction))
    this.cashIn = this.trxIn.transaction
  }

  onAction(){
    this.trxIn.callbackAction(this.transaction)
  }

}
