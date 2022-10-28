import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSearchQueryComponent } from './resume-search-query.component';

describe('ResumeSearchQueryComponent', () => {
  let component: ResumeSearchQueryComponent;
  let fixture: ComponentFixture<ResumeSearchQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeSearchQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSearchQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
