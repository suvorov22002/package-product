import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import intraClient from '../intra-client/src/intra-client';
import { PaymentFees } from '../models';
import { PaymentFeesListResponse } from '../models/res';
import { API_URL } from '../utils';



@Injectable({
  providedIn: 'root'
})
export class PaymentFeesService {

  private namespace: string = "forfaitpayment"
  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<PaymentFeesListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/getall`).pipe(
      //tap(data => console.log("Type of fees list :", data)),
      map(data => data.datas)
    )
  }
  create(data: PaymentFees){
    return this.http.post<PaymentFeesListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/add`, data).pipe(
      //tap(data => console.log("Create type of fees  :", data)),
      map(data => data.datas)
    )
  }
  update(data: PaymentFees){
    return this.http.put<PaymentFeesListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/update`, data).pipe(
      //tap(data => console.log("Update TypeOfFees :", data.datas[0])),
      map(data => data.datas)
    )
  }

  desactivate(data: PaymentFees){
    
  }
}
