import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterGenerationComponent } from './newsletter-generation.component';

describe('NewsletterGenerationComponent', () => {
  let component: NewsletterGenerationComponent;
  let fixture: ComponentFixture<NewsletterGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
