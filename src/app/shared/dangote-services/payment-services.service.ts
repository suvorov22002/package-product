import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs';
import { Partner, Versement, Transaction } from '../models';
import { MerchantResponse, MerchantListResponse, TransactionResponse, TransactionListResponses, ReportResponses } from '../models/res';

@Injectable({
  providedIn: 'root'
})
export class PaymentServicesService {

  private namespace!: String; 
  private link!: String;
  
  constructor(private http: HttpClient) { }

  /* Recherche du marchand dangote */
  findMerchant(referenceOperator: string, partner: Partner) {
   
    this.namespace = "merchants"
    this.link = partner.protocole + '://' + partner.host + ':' + partner.port + partner.path
    console.log("link1: " + this.link)

    return this.http.get<MerchantResponse>(`${this.link}/${this.namespace}/${referenceOperator}`)
    .pipe(
      tap(res => console.log(`CashIn User Info (${referenceOperator}, ${partner.partname}): `, res.data)),
      map(res => res.data)
    )
  }

  /* Recherche tous marchands */
  findAllMerchant(partner: Partner) {
   
    this.namespace = "merchants"
    this.link = partner.protocole + '://' + partner.host + ':' + partner.port + partner.path
    console.log("link1: " + this.link)

    return this.http.get<MerchantListResponse>(`${this.link}/${this.namespace}`)
    .pipe(
      tap(res => console.log(`CashIn User Info (${partner.partname}): `, res.data)),
      map(res => res.data)
    )
  }

  /* Initier un versement dangote */
  initiateCashinPrepay(req: Versement, partner: Partner){
    
    this.namespace = "initTransactions"
    this.link = partner.protocole + '://' + partner.host + ':' + partner.port + partner.path
    
   
    return this.http.post<TransactionResponse>(`${this.link}/${this.namespace}`, req)
      .pipe(
        tap(data => console.log(`Partner(${req.partnerCode}) versement :`,data)),
        map(data => data)
      )
  }

  /* liste de toutes les transactions */
  getAllTransactions(partner: Partner) {

    this.namespace = "transactions"
    this.link = partner.protocole + '://' + partner.host + ':' + partner.port + partner.path

    return this.http.get<TransactionListResponses>(`${this.link}/${this.namespace}`)
      .pipe(
        tap(data => console.log(`Partner(${partner.partcode}) transactions :`,data)),
        map(data => data.data)
      )

  }

  filterTransactionsWithCriteria(partner: Partner, transaction:Transaction,dateDebut:string, dateFin:string) {
    this.namespace = "findTransactions"
    return this.http.post<TransactionListResponses>(`${this.link}/${this.namespace}/${dateDebut}/${dateFin}`, transaction)
    .pipe(
      tap(data => console.log(`Filtered transactions :`,data)),
      map(data => data.data)
    )
  }

  findPendingTransactions(partner: Partner, user: string) {
    
    this.namespace = "findPendingTransactions"
    return this.http.get<TransactionListResponses>(`${this.link}/${this.namespace}/${user}`)
      .pipe(
        tap(data => console.log(`Partner(${partner.partcode}) transactions :`,data)),
        map(data => data.data)
      )
  }

  validateTransaction(partner: Partner, req: Transaction){
    
    this.namespace = "saveTransactions"
    return this.http.post<TransactionResponse>(`${this.link}/${this.namespace}`, req)
      .pipe(
        tap(snapshot => {
          console.log(`Partner(${req.partnerCode}) transaction validation:`,snapshot)
        }),
        map(data => data)
      )
  }

  /* Rapport journalier */
  generateRapport(partner: Partner, date: String, uti: string) {

    this.namespace = "getrapportday"
    return this.http.get<ReportResponses>(`${this.link}/${this.namespace}/${uti}/${date}`)
      .pipe(
        tap(data => console.log(`RapportJpur(${partner.partcode}) rapport :`,data)),
        map(data => data)
      )

  }

}
