import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnsweringContentDisplayComponent } from './question-answering-content-display.component';

describe('QuestionAnsweringContentDisplayComponent', () => {
  let component: QuestionAnsweringContentDisplayComponent;
  let fixture: ComponentFixture<QuestionAnsweringContentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAnsweringContentDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnsweringContentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
