import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionItemExtractionContentDisplayComponent } from './action-item-extraction-content-display.component';

describe('ActionItemExtractionContentDisplayComponent', () => {
  let component: ActionItemExtractionContentDisplayComponent;
  let fixture: ComponentFixture<ActionItemExtractionContentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionItemExtractionContentDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemExtractionContentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
