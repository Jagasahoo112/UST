import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligentMomConversationListingComponent } from './intelligent-mom-conversation-listing.component';

describe('IntelligentMomConversationListingComponent', () => {
  let component: IntelligentMomConversationListingComponent;
  let fixture: ComponentFixture<IntelligentMomConversationListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligentMomConversationListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligentMomConversationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
