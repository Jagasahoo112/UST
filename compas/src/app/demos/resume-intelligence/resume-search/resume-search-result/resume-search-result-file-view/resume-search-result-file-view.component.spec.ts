import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSearchResultFileViewComponent } from './resume-search-result-file-view.component';

describe('ResumeSearchResultFileViewComponent', () => {
  let component: ResumeSearchResultFileViewComponent;
  let fixture: ComponentFixture<ResumeSearchResultFileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeSearchResultFileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSearchResultFileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
