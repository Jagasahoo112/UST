import { TestBed } from '@angular/core/testing';

import { QuestionAnsweringService } from './question-answering.service';

describe('QuestionAnsweringService', () => {
  let service: QuestionAnsweringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionAnsweringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
