import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionItemExtractionListItemsComponent } from './action-item-extraction-list-items.component';

describe('ActionItemExtractionListItemsComponent', () => {
  let component: ActionItemExtractionListItemsComponent;
  let fixture: ComponentFixture<ActionItemExtractionListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionItemExtractionListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemExtractionListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
