import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustpayConfigurationsPageComponent } from './trustpay-configurations-page.component';

describe('TrustpayConfigurationsPageComponent', () => {
  let component: TrustpayConfigurationsPageComponent;
  let fixture: ComponentFixture<TrustpayConfigurationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustpayConfigurationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustpayConfigurationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
