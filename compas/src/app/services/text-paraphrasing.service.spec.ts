import { TestBed } from '@angular/core/testing';

import { TextParaphrasingService } from './text-paraphrasing.service';

describe('TextParaphrasingService', () => {
  let service: TextParaphrasingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextParaphrasingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
