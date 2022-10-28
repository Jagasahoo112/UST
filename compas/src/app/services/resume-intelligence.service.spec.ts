import { TestBed } from '@angular/core/testing';

import { ResumeIntelligenceService } from './resume-intelligence.service';

describe('ResumeIntelligenceService', () => {
  let service: ResumeIntelligenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeIntelligenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
