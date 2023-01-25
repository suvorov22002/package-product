import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import intraClient from '../intra-client/src/intra-client';
import { Transaction, Versement } from '../models';
import { CancelTransaction } from '../models/req';
import { TransactionListResponse, UserCashInDataResponse, VersementResponse } from '../models/res';
import { API_URL, downloadAsPdf, getDate } from '../utils'; // Test


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private namespace : String = "transaction"

  constructor(private http: HttpClient) { console.log(TransactionsService.name, this) }

  getAllPartnerTransactions(partnerRef: string){
    return this.http.get<TransactionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findbypartnercode/${partnerRef}`)
      .pipe(
        //tap(data => console.log(`Partner(${partnerRef}) transactions :`,data)),
        map(data => data.datas)
      )
  }

  filterTransactionsWithCriteria(
    transaction: Transaction
  ){
    return this.http.post<TransactionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findtransactions`, transaction)
    .pipe(
      //tap(data => console.log(`Filtered transactions :`,data)),
      map(data => data.datas)
    )
  }

  initVersement(req: Versement){
    return this.http.post<VersementResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/initcashin`, req)
      .pipe(
        //tap(data => console.log(`Partner(${req.partnerCode}) versement :`,data)),
        map(data => data.datas[0])
      )
  }
  validateVersement(req: Versement){
    return this.http.post(`${intraClient.backendBaseUrl}/${this.namespace}/saveTransactions`, req)
      .pipe(
        //tap(data => console.log(`Partner(${req.partnerCode}) versement validation:`,data)),
        map(data => data)
      )
  }

  redirectToClientSignature(
    age: string, ncp: string, cli: string,
    datecstring: string, heurec: string, utic: string,
    suf: string = "RAS"
  ){
    const urlParams = new URLSearchParams()
    urlParams.append("age", age)
    urlParams.append("ncp", ncp)
    urlParams.append("cli", cli)
    urlParams.append("datecstring", datecstring)
    urlParams.append("heurec", heurec)
    urlParams.append("utic", utic)
    urlParams.append("suf", suf)
    return this.http.get<{data: string}>(`${intraClient.backendBaseUrl}/${this.namespace}/liensig?+${urlParams.toString()}`).pipe(
      //tap(data => console.log("Signature data: ", data)),
      map(data => data)
    )
  }
  validateTransaction(req: Transaction){
    return this.http.put<TransactionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/validertransactions`, req)
      .pipe(
        tap(snapshot => {
          //console.log(`Partner(${req.partnerCode}) transaction validation:`,snapshot)

          const data = snapshot.datas[0]
          downloadAsPdf(data.reportdata!, 
            `RECU__${data.ageCaisse}_${data.referenceOperator}_${getDate(new Date())}`, 
            false)
        }),
        map(data => data)
      )
  }

  loadPendingTransactions(cashierCode: string){
    return this.http.get<TransactionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findPendingTransactions/${cashierCode}`)
      .pipe(
        //tap(data => console.log(`Pending Transaction for (${cashierCode}):`,data)),
        map(data => data)
      )
  }

  loadCashInUser(referenceOperator: string, partnerName: string){
    return this.http.get<UserCashInDataResponse>(`${intraClient.backendBaseUrl}/transaction/findlastinfosoperator/${referenceOperator}/${partnerName}`)
    .pipe(
      //tap(data => console.log(`CashIn User Info (${referenceOperator}, ${partnerName}): `, data.datas)),
      map(data => data.datas[0])
    )
  }

  loadSignature(rib: string){
    const splitArr = rib.split('-')
    const branchCode = splitArr[0]
    const ncp = splitArr[1]
    const clientCode = ncp.substring(0, 7)
    return this.http.get<{data: string}>(`${intraClient.backendBaseUrl}/${this.namespace}/liensig?age=${branchCode}&ncp=${ncp}&cli=${clientCode}`).pipe(
      //tap(data => console.log(`Signature Info : `, data)),
      map(data => data.data)
    )
  }


  loadTFJRecap(partnerName: string, cuti: string){
    return this.http.get<{data: string}>(`${intraClient.backendBaseUrl}/${this.namespace}/nivellementaccountpartner/${partnerName}/${cuti}`).pipe(
      map(data => {
        let base64 = data.data
        downloadAsPdf(base64, `RECAP_TFJ_${new Date().toISOString()}`, false)
      })
    )
  }

  loadMintransReceipt(transaction: Transaction){
    return this.http.post<{data: string}>(`${intraClient.backendBaseUrl}/${this.namespace}/editbordereauversement`, transaction).pipe(
      map(data => {
        let base64 = data.data
        downloadAsPdf(base64, `RECU_MINTRANS_${new Date().toISOString()}`, false)
      })
    )
  }

  cancelTransaction(payload: CancelTransaction){
    return this.http.put(`${intraClient.backendBaseUrl}/${this.namespace}/canceltransactionpartner`, payload).pipe(
      map(data => data)
    )
  }
}
