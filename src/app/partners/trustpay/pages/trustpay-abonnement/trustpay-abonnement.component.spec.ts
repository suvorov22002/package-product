import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustpayAbonnementComponent } from './trustpay-abonnement.component';

describe('TrustpayAbonnementComponent', () => {
  let component: TrustpayAbonnementComponent;
  let fixture: ComponentFixture<TrustpayAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustpayAbonnementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustpayAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
