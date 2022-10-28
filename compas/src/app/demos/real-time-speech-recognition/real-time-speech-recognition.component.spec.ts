import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeSpeechRecognitionComponent } from './real-time-speech-recognition.component';

describe('RealTimeSpeechRecognitionComponent', () => {
  let component: RealTimeSpeechRecognitionComponent;
  let fixture: ComponentFixture<RealTimeSpeechRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeSpeechRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeSpeechRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
