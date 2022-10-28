import { TestBed } from '@angular/core/testing';

import { SearchNotationService } from './search-notation.service';

describe('SearchNotationService', () => {
  let service: SearchNotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchNotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
