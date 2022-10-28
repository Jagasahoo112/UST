import { TestBed } from '@angular/core/testing';

import { IntelligentSearchFileuploaderService } from './intelligent-search-fileuploader.service';

describe('IntelligentSearchFileuploaderService', () => {
  let service: IntelligentSearchFileuploaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntelligentSearchFileuploaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
