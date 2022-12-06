import { TestBed } from '@angular/core/testing';

import { CovidTrackerService } from './covid-tracker.service';

describe('CovidTrackerService', () => {
  let service: CovidTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
