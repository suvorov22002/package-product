import { TestBed } from '@angular/core/testing';

import { TypeOfFeesService } from './type-of-fees.service';

describe('TypeOfFeesService', () => {
  let service: TypeOfFeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
