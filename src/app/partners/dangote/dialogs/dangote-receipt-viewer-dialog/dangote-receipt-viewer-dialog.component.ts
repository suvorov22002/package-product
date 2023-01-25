import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { openSnackBar } from 'src/app/shared/utils';


@Component({
  selector: 'app-dangote-receipt-viewer-dialog',
  templateUrl: './dangote-receipt-viewer-dialog.component.html',
  styleUrls: ['./dangote-receipt-viewer-dialog.component.scss']
})
export class DangoteReceiptViewerDialogComponent implements OnInit {

  
  pdfSrc : any
  pdf!: PDFDocumentProxy;
  isPdfLoaded = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public cashIn: any, private snackbar: MatSnackBar) { }

  ngOnInit() {
   // console.log('repordata: ', this.cashIn)
    this.pdfSrc = "data:application/pdf;base64,"+this.cashIn;
    console.log('repordata: ', this.pdfSrc)
  }

  print(){
    openSnackBar(this.snackbar, "Impression en cours ...")
    this.pdf.getData().then((u8) => {
      let blob = new Blob([u8.buffer], {
          type: 'application/pdf'
      });

      const blobUrl = window.URL.createObjectURL((blob));
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = blobUrl;
      document.body.appendChild(iframe);
      if(iframe.contentWindow!==null)
                 iframe.contentWindow.print();
  });
  }

  onLoaded(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isPdfLoaded = true;
  }
}
