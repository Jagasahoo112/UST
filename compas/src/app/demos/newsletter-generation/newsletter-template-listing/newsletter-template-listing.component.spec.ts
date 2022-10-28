import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterTemplateListingComponent } from './newsletter-template-listing.component';

describe('NewsletterTemplateListingComponent', () => {
  let component: NewsletterTemplateListingComponent;
  let fixture: ComponentFixture<NewsletterTemplateListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterTemplateListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterTemplateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
