import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDocumentViewFileComponent } from './resume-document-view-file.component';

describe('ResumeDocumentViewFileComponent', () => {
  let component: ResumeDocumentViewFileComponent;
  let fixture: ComponentFixture<ResumeDocumentViewFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeDocumentViewFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeDocumentViewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
