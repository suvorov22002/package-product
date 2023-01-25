import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import intraClient from './shared/intra-client/src/intra-client';
import { PartnersService } from './shared/services/partners.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'digital-first';
  constructor(
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    
  }
}
