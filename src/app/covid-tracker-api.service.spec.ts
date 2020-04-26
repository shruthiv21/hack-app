import { TestBed } from '@angular/core/testing';

import { CovidTrackerApiService } from './covid-tracker-api.service';

describe('CovidTrackerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovidTrackerApiService = TestBed.get(CovidTrackerApiService);
    expect(service).toBeTruthy();
  });
});
