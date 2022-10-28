import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentViewFileComponent } from './document-view-file.component';

describe('DocumentViewFileComponent', () => {
  let component: DocumentViewFileComponent;
  let fixture: ComponentFixture<DocumentViewFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentViewFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentViewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
