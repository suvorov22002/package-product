import { Injectable } from '@angular/core';
import { LiferayUser } from '../intra-client/src/types/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  liferayUser: LiferayUser = {
    codeAge: '',
    firstname: '',
    lastname: '',
    libAge: '',
    loginPortal: '',
    screenname: ''
  }

  
  public get fullname() : string {
    return `${this.liferayUser.lastname} ${this.liferayUser.firstname}`
  }
  

  /* cashierCode: string = "KWIY"
  branchCode: string = "00061"
  branchName: string = "BONAPRISO"
  cashierName: string = "MAEL" */

  constructor() { }
}


