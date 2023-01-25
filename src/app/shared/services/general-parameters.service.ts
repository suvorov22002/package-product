import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import intraClient from '../intra-client/src/intra-client';
import { GeneralParameter } from '../models';
import { GeneralParameterListResponse } from '../models/res';
import { API_URL } from '../utils';


@Injectable({
  providedIn: 'root'
})
export class GeneralParametersService {

  private namespace = "propertyconfig"
  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<GeneralParameterListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/getall`)
    .pipe(
      //tap(data => console.log(`GeneralParameterListResponse: `, data.datas)),
      map(data => data.datas)
    )
  }

  create(data: GeneralParameter){
    return this.http.post<GeneralParameterListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/add`, data).pipe(
      //tap(data => console.log("Create GeneralParameterListResponse:", data)),
      map(data => data.datas)
    )
  }
  update(data: GeneralParameter){
    return this.http.put<GeneralParameterListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/update`, data).pipe(
      //tap(data => console.log("Update GeneralParameterListResponse :", data.datas[0])),
      map(data => data.datas)
    )
  }
}
