import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentMetricsDisplayComponent } from './sentiment-metrics-display.component';

describe('SentimentMetricsDisplayComponent', () => {
  let component: SentimentMetricsDisplayComponent;
  let fixture: ComponentFixture<SentimentMetricsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentimentMetricsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentMetricsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
