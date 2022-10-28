import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligentMomActionItemsListingComponent } from './intelligent-mom-action-items-listing.component';

describe('IntelligentMomActionItemsListingComponent', () => {
  let component: IntelligentMomActionItemsListingComponent;
  let fixture: ComponentFixture<IntelligentMomActionItemsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligentMomActionItemsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligentMomActionItemsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
