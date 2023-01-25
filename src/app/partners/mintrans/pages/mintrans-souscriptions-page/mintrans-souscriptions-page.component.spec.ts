import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintransSouscriptionsPageComponent } from './mintrans-souscriptions-page.component';

describe('MintransSouscriptionsPageComponent', () => {
  let component: MintransSouscriptionsPageComponent;
  let fixture: ComponentFixture<MintransSouscriptionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintransSouscriptionsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MintransSouscriptionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
