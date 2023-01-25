import { TestBed } from '@angular/core/testing';

import { PaymentFeesService } from './payment-fees.service';

describe('PaymentFeesService', () => {
  let service: PaymentFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
