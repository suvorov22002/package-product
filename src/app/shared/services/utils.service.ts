import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransportType } from '../models/enums';
import { API_URL } from '../utils';
import { map, tap } from 'rxjs/operators'
import { DepartmentDelegationListResponse, PaymentFeesListResponse, TypeOfFeesClassListResponse, TypeOfFeesListResponse, UserCashInDataResponse } from '../models/res';
import intraClient from '../intra-client/src/intra-client';




@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  namespace = "typeforfait"
  constructor(
    private http: HttpClient
  ) { }



  loadTypeOfFeessFromTransportType(type: TransportType){
    return this.http.get<TypeOfFeesListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findbypartnercodecategoriegroupe/${type}`)
    .pipe(
      //tap(data => console.log(`Type of Fees from transport type (${type}): `, data.datas)),
      map(data => data.datas)
    )
  }

  loadPaymentFeesFromTypeOfFees(TypeOfFees: string){
    return this.http.get<PaymentFeesListResponse>(`${intraClient.backendBaseUrl}/forfaitpayment/findbytypeforfait/${TypeOfFees}`).pipe(
      //tap(data => console.log(`Fees from type of fee (${TypeOfFees}): `, data.datas)),
      map(data => data.datas)
    )
  }

  loadClassFromTypeOfFees(TypeOfFees: string){
    return this.http.get<TypeOfFeesClassListResponse>(`${intraClient.backendBaseUrl}/forfaitclasse/findbytypeforfait/${TypeOfFees}`).pipe(
      //tap(data => console.log(`Fees from type of fee (${TypeOfFees}): `, data.datas)),
      map(data => data.datas)
    )
  }

  loadDepartementDelegations(){
    return this.http.get<DepartmentDelegationListResponse>(`${intraClient.backendHost}/nomenclature-service/rest/api/nomenclature/findbycategorie/016`)
    .pipe(
      //tap(data => console.log(`DepartmentDelegationListResponse: `, data.datas)),
      map(data => data.datas)
    )
  }

  

  
}
