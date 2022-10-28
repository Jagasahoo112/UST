import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderIntelligentSearchComponent } from './file-uploader.component';

describe('FileUploaderIntelligentSearchComponent', () => {
  let component: FileUploaderIntelligentSearchComponent;
  let fixture: ComponentFixture<FileUploaderIntelligentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploaderIntelligentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderIntelligentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
