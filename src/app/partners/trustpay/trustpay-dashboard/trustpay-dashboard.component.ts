import { Component, OnInit } from '@angular/core';
import { PartnersService } from 'src/app/shared/services/partners.service';

@Component({
  selector: 'app-trustpay-dashboard',
  templateUrl: './trustpay-dashboard.component.html',
  styleUrls: ['./trustpay-dashboard.component.scss']
})
export class TrustpayDashboardComponent implements OnInit {

  constructor(public partnersService: PartnersService) { }

  ngOnInit(): void {
    if (this.partnersService.curPartner.hasOwnProperty.length === 1) {
      const recupPartner = localStorage.getItem(PartnersService.CUR_PARTNER_STORAGE_KEY)
      if (recupPartner !== null)
          this.partnersService.curPartner = JSON.parse(recupPartner)
    }
  }

}
