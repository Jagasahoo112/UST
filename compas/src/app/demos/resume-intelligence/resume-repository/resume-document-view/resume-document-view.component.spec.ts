import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDocumentViewComponent } from './resume-document-view.component';

describe('ResumeDocumentViewComponent', () => {
  let component: ResumeDocumentViewComponent;
  let fixture: ComponentFixture<ResumeDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
