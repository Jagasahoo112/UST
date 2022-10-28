import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextConversationSummarizationComponent } from './text-conversation-summarization.component';

describe('TextConversationSummarizationComponent', () => {
  let component: TextConversationSummarizationComponent;
  let fixture: ComponentFixture<TextConversationSummarizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextConversationSummarizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextConversationSummarizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
