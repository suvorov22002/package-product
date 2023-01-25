import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {map, tap} from 'rxjs/operators'
import intraClient from '../intra-client/src/intra-client';
import { UserInfo } from '../models';
import { UserInfoResponse } from '../models/res';
import { API_URL } from '../utils';



@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(
    private http: HttpClient
  ) { 
    intraClient.backendBaseUrl = "http://172.21.10.48:8060/rest/api/paypartnerservices"
  }


  getUserInfoFromClientCode(clientCode: string){
    return this.http.get<UserInfoResponse>(`${intraClient.backendBaseUrl}/transaction/findcustomerinfo/${clientCode}`)
    .pipe(
      tap((data) => console.log(`User info from client code(${clientCode})`, data)),
      map( data => data.datas[0])
    )
  }

}
