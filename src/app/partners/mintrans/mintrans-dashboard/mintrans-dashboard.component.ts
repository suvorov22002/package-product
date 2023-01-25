import { Component, OnInit } from '@angular/core';
import { PartnersService } from 'src/app/shared/services/partners.service';

@Component({
  selector: 'app-mintrans-dashboard',
  templateUrl: './mintrans-dashboard.component.html',
  styleUrls: ['./mintrans-dashboard.component.scss']
})
export class MintransDashboardComponent implements OnInit {

  constructor(
    public partnersService: PartnersService
  ) { }

  ngOnInit(): void {
  }
  onDisconnect(){
    window.location.href = "http://192.168.11.137:18080/web/guest/applications"
  }

}
