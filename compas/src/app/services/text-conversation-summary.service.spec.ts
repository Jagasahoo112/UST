import { TestBed } from '@angular/core/testing';

import { TextConversationSummaryService } from './text-conversation-summary.service';

describe('TextConversationSummaryService', () => {
  let service: TextConversationSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextConversationSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
