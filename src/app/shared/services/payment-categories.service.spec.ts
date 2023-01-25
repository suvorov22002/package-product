import { TestBed } from '@angular/core/testing';

import { PaymentCategoriesService } from './payment-categories.service';

describe('PaymentCategoriesService', () => {
  let service: PaymentCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
