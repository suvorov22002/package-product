import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Versement } from 'src/app/shared/models';
import { TransactionStatus } from 'src/app/shared/models/enums';

@Component({
  selector: 'app-cash-in-recap-dialog',
  templateUrl: './cash-in-recap-dialog.component.html',
  styleUrls: ['./cash-in-recap-dialog.component.scss']
})
export class CashInRecapDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public cashIn: Versement
  ) { }

  ngOnInit(): void {
  }

  /* cashIn: Versement = {
    "id": "221116212416MINTRANSAEGNZ3AULY",
    
    "reference": null,
    "statusTrans": TransactionStatus.PROCESSING,
    "transactionMode": "VERSEMENT_AFB",
    "typeOperation": "001",
    "amount": 80000,
    "accountDebit": " --- ",
    "referenceOperator": "123456789",
    "cancelReason": null,
    "usercancel": null,
    "nomOperator": "FOMEKONG TSAYO CHRIST MAEL",
    "userCaisse": "MAGC",
    "ageCaisse": "00001",
    "accountCredit": "00001-07643581051-05",
    "referencenumber": "221116212612032467",
    "eveid": "842471",
    "usermail": null,
    "validfrom": 1668630256964,
    "partieVersante": "FOMEKONG TSAYO CHRIST MAEL",
    "telephone": "698920506",
    "partnerCode": "MINTRANS",
    "reason": "PERMIS_CONDUITE",
    "dco": 1667343600000,
    "amountReceived": 800000,
    "errorsMsg": null,
    "exceptionlib": null,
    "exceptionCode": null,
    "reportdata": null
  } */

}
