import { TestBed } from '@angular/core/testing';

import { DangotePartnerOnlyGuard } from './dangote-partner-only.guard';

describe('DangotePartnerOnlyGuard', () => {
  let guard: DangotePartnerOnlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DangotePartnerOnlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
