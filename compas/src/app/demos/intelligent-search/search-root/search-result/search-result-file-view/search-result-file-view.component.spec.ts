import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultFileViewComponent } from './search-result-file-view.component';

describe('SearchResultFileViewComponent', () => {
  let component: SearchResultFileViewComponent;
  let fixture: ComponentFixture<SearchResultFileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultFileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
