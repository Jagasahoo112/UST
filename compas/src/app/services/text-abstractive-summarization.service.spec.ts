import { TestBed } from '@angular/core/testing';

import { TextAbstractiveSummarizationService } from './text-abstractive-summarization.service';

describe('TextAbstractiveSummarizationService', () => {
  let service: TextAbstractiveSummarizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAbstractiveSummarizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
