import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterDataSourceListingComponent } from './newsletter-data-source-listing.component';

describe('NewsletterDataSourceListingComponent', () => {
  let component: NewsletterDataSourceListingComponent;
  let fixture: ComponentFixture<NewsletterDataSourceListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterDataSourceListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterDataSourceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
