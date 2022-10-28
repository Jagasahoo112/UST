import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSearchResultComponent } from './resume-search-result.component';

describe('ResumeSearchResultComponent', () => {
  let component: ResumeSearchResultComponent;
  let fixture: ComponentFixture<ResumeSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
