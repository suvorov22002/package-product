import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import intraClient from '../intra-client/src/intra-client';
import { TypeOfFeesClass } from '../models';
import { TypeOfFeesClassListResponse } from '../models/res';
import { API_URL } from '../utils'; 



@Injectable({
  providedIn: 'root'
})
export class TypeOfFeesClassService {

  private namespace: string = "forfaitclasse"
  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<TypeOfFeesClassListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/getall`).pipe(
      //tap(data => console.log("Type of fees class list :", data)),
      map(data => data.datas)
    )
  }
  create(data: TypeOfFeesClass){
    return this.http.post<TypeOfFeesClassListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/add`, data).pipe(
      //tap(data => console.log("Create type of fees class :", data)),
      map(data => data.datas)
    )
  }
  update(data: TypeOfFeesClass){
    return this.http.put<TypeOfFeesClassListResponse>(`${intraClient.backendBaseUrl}/${this.namespace}/update`, data).pipe(
      //tap(data => console.log("Update TypeOfFeesClass :", data.datas[0])),
      map(data => data.datas)
    )
  }
}
