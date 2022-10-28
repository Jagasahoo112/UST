import { TestBed } from '@angular/core/testing';

import { TextActionItemExtractionService } from './text-action-item-extraction.service';

describe('TextActionItemExtractionService', () => {
  let service: TextActionItemExtractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextActionItemExtractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
