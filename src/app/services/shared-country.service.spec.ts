import { TestBed } from '@angular/core/testing';

import { SharedCountryService } from './shared-country.service';

describe('SharedCountryService', () => {
  let service: SharedCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
