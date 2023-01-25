import { TestBed } from '@angular/core/testing';

import { TypeOfFeesClassService } from './type-of-fees-class.service';

describe('TypeOfFeesClassService', () => {
  let service: TypeOfFeesClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfFeesClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
