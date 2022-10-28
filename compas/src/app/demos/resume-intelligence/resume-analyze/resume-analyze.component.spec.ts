import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeAnalyzeComponent } from './resume-analyze.component';

describe('ResumeAnalyzeComponent', () => {
  let component: ResumeAnalyzeComponent;
  let fixture: ComponentFixture<ResumeAnalyzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeAnalyzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
