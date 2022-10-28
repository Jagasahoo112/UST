import { TestBed } from '@angular/core/testing';

import { VisualAnalysisService } from './visual-analysis.service';

describe('VisualAnalysisService', () => {
  let service: VisualAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
