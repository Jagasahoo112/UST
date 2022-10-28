import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSearchQuerySuggestionsComponent } from './resume-search-query-suggestions.component';

describe('ResumeSearchQuerySuggestionsComponent', () => {
  let component: ResumeSearchQuerySuggestionsComponent;
  let fixture: ComponentFixture<ResumeSearchQuerySuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeSearchQuerySuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSearchQuerySuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
