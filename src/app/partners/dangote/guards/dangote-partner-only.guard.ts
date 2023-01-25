import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { delay, map, Observable } from 'rxjs';
import { Partner } from 'src/app/shared/models';
import { PartnersService } from 'src/app/shared/services/partners.service';
import { partnerCodeNamespaceMappper } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class DangotePartnerOnlyGuard implements CanActivate {
  
  constructor(private partnersService: PartnersService, 
    private snackbar: MatSnackBar,
    private router: Router){

  }
  
  public get partnerNamespace() {
    const savePartner = localStorage.getItem(PartnersService.CUR_PARTNER_STORAGE_KEY)
    if(savePartner != null){
      let curPartner: Partner = JSON.parse(savePartner)
      this.partnersService.curPartner = curPartner
      return partnerCodeNamespaceMappper[curPartner.partcode ?? ""]
    }
    else {
      
      return partnerCodeNamespaceMappper[this.partnersService.curPartner.partcode ?? ""]
    }
    
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let namespace = this.partnerNamespace
    if(namespace){
      
      return true;
    }
    else {
      this.snackbar.open("Vous devez d'abord selectionner le partenaire !", "OK").afterOpened().pipe(
        delay(3000),
        map( _ => this.snackbar.dismiss())
      ).subscribe()
      this.router.navigateByUrl('/')
      return false
    }
  }
  
}
