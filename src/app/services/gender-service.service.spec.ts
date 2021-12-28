import { TestBed } from '@angular/core/testing';

import { GenderServiceService } from './gender-service.service';

describe('GenderServiceService', () => {
  let service: GenderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
