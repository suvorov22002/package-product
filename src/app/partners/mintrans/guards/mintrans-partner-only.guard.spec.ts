import { TestBed } from '@angular/core/testing';

import { MintransPartnerOnlyGuard } from './mintrans-partner-only.guard';

describe('MintransPartnerOnlyGuard', () => {
  let guard: MintransPartnerOnlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MintransPartnerOnlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
