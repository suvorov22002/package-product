import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/shared/models';

//import { jsPDF } from "jspdf";

@Component({
  selector: 'app-mintrans-receipt-dialog',
  templateUrl: './mintrans-receipt-dialog.component.html',
  styleUrls: ['./mintrans-receipt-dialog.component.scss']
})
export class MintransReceiptDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) transaction: Transaction
  ) { }

  ngOnInit(): void {
  }

  onDownload(){
    /* var doc = new jsPDF();
    var pdfjs = document.querySelector('#transaction-receipt') as  HTMLElement;

    // Convert HTML to PDF in JavaScript
    doc.html(pdfjs, {
      callback: function(doc) {
        doc.save("output.pdf");
      },
      x: 10,
      y: 10
    }); */
  }

}
