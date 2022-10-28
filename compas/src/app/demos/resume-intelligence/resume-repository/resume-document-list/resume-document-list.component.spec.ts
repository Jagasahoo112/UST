import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDocumentListComponent } from './resume-document-list.component';

describe('ResumeDocumentListComponent', () => {
  let component: ResumeDocumentListComponent;
  let fixture: ComponentFixture<ResumeDocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeDocumentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
