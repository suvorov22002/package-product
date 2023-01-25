import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustpayCustomersPageComponent } from './trustpay-customers-page.component';

describe('TrustpayCustomersPageComponent', () => {
  let component: TrustpayCustomersPageComponent;
  let fixture: ComponentFixture<TrustpayCustomersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustpayCustomersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustpayCustomersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
