import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, pipe, tap } from 'rxjs'
import intraClient from '../intra-client/src/intra-client';
import { Partner } from '../models';
import { CreatePartnerReq } from '../models/req';
import { PartnerListResponse } from '../models/res';
import { API_URL } from '../utils';



@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  static CUR_PARTNER_STORAGE_KEY = "cur_partner"

  private namespace : String = "partner"

  private _curPartner: Partner = {}

 
  public get curPartner() {
    return this._curPartner
  }

  
  public set curPartner(v : Partner) {
    this._curPartner = v;
  }
  
  

  constructor(private http: HttpClient) { console.log(PartnersService.name, this)
    intraClient.backendBaseUrl = "http://192.168.11.75:9001/digitalfirst-service/rest/api/paypartnerservices"
  }

  getAllPartners(){
    return this.http.get<PartnerListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/getall`)
      .pipe(
        //tap(data => console.log("All parners : ",data)),
        map(data => data.datas)
      )
  }

  createPartner(data: CreatePartnerReq){
    return this.http.post(`${intraClient.backendBaseUrl}/${this.namespace}/add`, data)
    .pipe(
      //tap(e => "Create Partner response")
    )
  }

  getPartnerByName(partnerName: string){
    return this.http.get<PartnerListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/findbypartname/${partnerName}`)
      .pipe(
        //tap(data => console.log("All parners : ",data)),
        map(data => data.datas[0])
      )
  }

  updatePartner(data: Partner){
    return this.http.put(`${intraClient.backendBaseUrl}/${this.namespace}/update`, data)
    .pipe(
      //tap(e => console.log(`Update Partner response : ${e}`))
    )
  }
}
