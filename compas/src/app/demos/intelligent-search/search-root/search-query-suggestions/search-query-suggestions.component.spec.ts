import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuerySuggestionsComponent } from './search-query-suggestions.component';

describe('SearchQuerySuggestionsComponent', () => {
  let component: SearchQuerySuggestionsComponent;
  let fixture: ComponentFixture<SearchQuerySuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchQuerySuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQuerySuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
