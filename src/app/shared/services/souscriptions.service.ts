import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subscription, tap } from 'rxjs';
import intraClient from '../intra-client/src/intra-client';
import { Souscription } from '../models';
import { SouscriptionListResponse, SouscriptionResponse } from '../models/res';

import { API_URL, downloadAsPdf } from '../utils';




@Injectable({
  providedIn: 'root'
})
export class SouscriptionsService {

  private namespace : String = "operator"

  constructor(
    private http: HttpClient
  ) { 
    intraClient.backendBaseUrl =  "http://172.21.10.48:8060/rest/api/paypartnerservices"
  }


  getPartnerOperators(partnerRef: string){
   
    return this.http.get<SouscriptionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findbypartnercode/${partnerRef}`)
      .pipe(
        //tap(data => console.log(`Partner(${partnerRef}) operators :`,data)),
        map(data => data.datas)
      )
  }

  getSouscriptionFromClientCode(clientCode: string){
    return this.http.get<SouscriptionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findbycodeclient/${clientCode}`)
      .pipe(
        //tap(data => console.log(`Client code (${clientCode}) souscription :`,data)),
        map(data => data.datas)
      )
  }


  createSubscription(data: Souscription){
    console.log("Object Subscribe: "+JSON.stringify(data))
    return this.http.post<SouscriptionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/add`, data).pipe(
      tap(res => {
        console.log("Subscription created: ", res)
        downloadAsPdf(res.datas[0].bordereauSouscription!, `SOUSCRIPTION_${data.agenceSous}_${data.codeClient}_${data.customerReferencePartner}`, false)
      }),
    
      map(data => data)
    )
  }

  cancelSubscription(data: Souscription){
    return this.http.put(`${intraClient.backendBaseUrl}/${this.namespace}/cancel`, data).pipe(
      //tap(data => console.log("Subscription cancelled: ", data)),
      map(data => data)
    )
  }
  validateSubscription(data: Souscription){
    return this.http.put(`${intraClient.backendBaseUrl}/${this.namespace}/validate`, data).pipe(
      //tap(data => console.log("Subscription validated: ", data)),
      map(data => data)
    )
  }


  filterSubscriptions(data: Souscription){
    return this.http.post<SouscriptionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findoperator`, data).pipe(
      //tap(data => console.log("Subscriptions filter: ", data)),
      map(data => data.datas)
    )
    
  }

  getSouscriptionFromClientCodePartner(clientCode: string, partnerCode: string){
    return this.http.get<SouscriptionListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findbypartnercodecodeclient/${partnerCode}/${clientCode}`)
      .pipe(
        //tap(data => console.log(`Client code (${clientCode}) souscription :`,data)),
        map(data => data.datas)
      )
  }

}
