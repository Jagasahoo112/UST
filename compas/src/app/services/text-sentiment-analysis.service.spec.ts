import { TestBed } from '@angular/core/testing';

import { TextSentimentAnalysisService } from './text-sentiment-analysis.service';

describe('TextSentimentAnalysisService', () => {
  let service: TextSentimentAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextSentimentAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
