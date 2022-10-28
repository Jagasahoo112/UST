import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationCanvasComponent } from './annotation-canvas.component';

describe('AnnotationCanvasComponent', () => {
  let component: AnnotationCanvasComponent;
  let fixture: ComponentFixture<AnnotationCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
