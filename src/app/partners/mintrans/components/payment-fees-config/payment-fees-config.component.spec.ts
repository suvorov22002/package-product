import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFeesConfigComponent } from './payment-fees-config.component';

describe('PaymentFeesConfigComponent', () => {
  let component: PaymentFeesConfigComponent;
  let fixture: ComponentFixture<PaymentFeesConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFeesConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFeesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
