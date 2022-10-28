import { TestBed } from '@angular/core/testing';

import { GrammarCheckService } from './grammar-check.service';

describe('GrammarCheckService', () => {
  let service: GrammarCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrammarCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
