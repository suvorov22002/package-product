import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { BASIC_AUTH_VALUE } from 'src/app/shared/intra-client/src/constants';
import { LiferayUser } from 'src/app/shared/intra-client/src/types/models';

import { AuthService } from 'src/app/shared/services/auth.service';
import { APP_PERMISSIONS, PERMISSIONS_STORAGE_KEY } from 'src/app/shared/utils/permissions';

@Component({
  selector: 'app-main-layout-page',
  templateUrl: './main-layout-page.component.html',
  styleUrls: ['./main-layout-page.component.scss']
})
export class MainLayoutPageComponent implements OnInit {

  
  public get fullname() : string {
    return this.authService.fullname
  }
  

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit(): void {
    
    // For test only
    this.getUser()
 
    this.router.navigateByUrl("/partners-dashboard")
  }

  loadPermissions(route: ActivatedRoute, permissionsService: NgxPermissionsService){
    route.queryParams.subscribe(params => {
      const encodedPermissions = params['r']; // recuperaton des roles dans l'url
      if(encodedPermissions){
        const decodedPermissions =  window.atob(encodedPermissions)
        const allPermissionsArray = decodedPermissions.split(";")
        permissionsService.loadPermissions(allPermissionsArray)
        localStorage.setItem(PERMISSIONS_STORAGE_KEY, encodedPermissions)
      }
     });
  }

  async getUser(){

    let usersId = 49287
    const res = await fetch( `http://192.168.11.137:18080/o/afb-liferay-rest/afb-users-by-id/${usersId}`, {
      method: 'GET',
      headers: {
        "Authorization": BASIC_AUTH_VALUE
      }
    } )
           .then(data => data.json())
    console.log('Liferay User: '+JSON.stringify(res))

    this.authService.liferayUser = res as LiferayUser
    this.permissionsService.loadPermissions(APP_PERMISSIONS)
    
  }

}
