import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnsweringAnswerDetailsComponent } from './question-answering-answer-details.component';

describe('QuestionAnsweringAnswerDetailsComponent', () => {
  let component: QuestionAnsweringAnswerDetailsComponent;
  let fixture: ComponentFixture<QuestionAnsweringAnswerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAnsweringAnswerDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnsweringAnswerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
