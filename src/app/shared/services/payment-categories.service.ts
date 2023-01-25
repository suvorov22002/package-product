import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import intraClient from '../intra-client/src/intra-client';
//import { PaymentCategoryResponse } from '../models/res';
//import { API_URL } from '../utils';

const API_URL = intraClient.backendBaseUrl

@Injectable({
  providedIn: 'root'
})
export class PaymentCategoriesService {

  private namespace = "categorypayment"
  constructor(private http: HttpClient) { }

  /* getPaymentCategoriesFromPartnerCode(partnerCode: string){
    return this.http.get<PaymentCategoryResponse>(`${API_URL}/${this.namespace}/findbypartnercode/${partnerCode}`).pipe(
      tap(data => console.log(`Partner code (${partnerCode}) payment categories :`,data)),
      map(data => data.datas)
    )
  } */
}
