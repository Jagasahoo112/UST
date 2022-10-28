import { TestBed } from '@angular/core/testing';

import { AudioActionItemExtractionService } from './audio-action-item-extraction.service';

describe('AudioActionItemExtractionService', () => {
  let service: AudioActionItemExtractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioActionItemExtractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
