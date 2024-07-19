import { TestBed } from '@angular/core/testing';

import { ChartSService } from './chart-s.service';

describe('ChartSService', () => {
  let service: ChartSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
