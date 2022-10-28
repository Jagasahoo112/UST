import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAbstractiveSummarizationComponent } from './text-abstractive-summarization.component';

describe('TextAbstractiveSummarizationComponent', () => {
  let component: TextAbstractiveSummarizationComponent;
  let fixture: ComponentFixture<TextAbstractiveSummarizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAbstractiveSummarizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAbstractiveSummarizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
