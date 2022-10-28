import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToSpeechConversionComponent } from './text-to-speech-conversion.component';

describe('TextToSpeechConversionComponent', () => {
  let component: TextToSpeechConversionComponent;
  let fixture: ComponentFixture<TextToSpeechConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextToSpeechConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextToSpeechConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
