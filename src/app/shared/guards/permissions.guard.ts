import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { PERMISSIONS_STORAGE_KEY } from '../utils/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  constructor(
    private permissionsService: NgxPermissionsService
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const encodedPermissions = localStorage.getItem(PERMISSIONS_STORAGE_KEY) 
    if(encodedPermissions){
      const decodedPermissions =  window.atob(encodedPermissions)
      const allPermissionsArray = decodedPermissions.split(";")
      this.permissionsService.loadPermissions(allPermissionsArray)
    } 
    return true;
  }
  
}
