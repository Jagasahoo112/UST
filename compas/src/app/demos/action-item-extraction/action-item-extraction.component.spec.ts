import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionItemExtractionComponent } from './action-item-extraction.component';

describe('ActionItemExtractionComponent', () => {
  let component: ActionItemExtractionComponent;
  let fixture: ComponentFixture<ActionItemExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionItemExtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
