import { TestBed } from '@angular/core/testing';

import { NewsletterGenerationService } from './newsletter-generation.service';

describe('NewsletterGenerationService', () => {
  let service: NewsletterGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsletterGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
