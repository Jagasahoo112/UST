import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeRepositorySearchComponent } from './resume-repository-search.component';

describe('ResumeRepositorySearchComponent', () => {
  let component: ResumeRepositorySearchComponent;
  let fixture: ComponentFixture<ResumeRepositorySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeRepositorySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeRepositorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
