import { Component, OnInit } from '@angular/core';
import { PartnersService } from 'src/app/shared/services/partners.service';

@Component({
  selector: 'app-dangote-dashboard',
  templateUrl: './dangote-dashboard.component.html',
  styleUrls: ['./dangote-dashboard.component.scss']
})
export class DangoteDashboardComponent implements OnInit {

  constructor( public partnersService: PartnersService) { }

  ngOnInit(): void {
    
      if (this.partnersService.curPartner.hasOwnProperty.length === 1) {
        const recupPartner = localStorage.getItem(PartnersService.CUR_PARTNER_STORAGE_KEY)
        if (recupPartner !== null)
            this.partnersService.curPartner = JSON.parse(recupPartner)
      }
  }

}
