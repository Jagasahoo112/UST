import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentTextDisplayComponent } from './sentiment-text-display.component';

describe('SentimentTextDisplayComponent', () => {
  let component: SentimentTextDisplayComponent;
  let fixture: ComponentFixture<SentimentTextDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentimentTextDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentTextDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
