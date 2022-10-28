import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeFileUploderComponent } from './resume-file-uploder.component';

describe('ResumeFileUploderComponent', () => {
  let component: ResumeFileUploderComponent;
  let fixture: ComponentFixture<ResumeFileUploderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeFileUploderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeFileUploderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
