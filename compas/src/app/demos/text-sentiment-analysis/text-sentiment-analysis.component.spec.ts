import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSentimentAnalysisComponent } from './text-sentiment-analysis.component';

describe('TextSentimentAnalysisComponent', () => {
  let component: TextSentimentAnalysisComponent;
  let fixture: ComponentFixture<TextSentimentAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSentimentAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSentimentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
