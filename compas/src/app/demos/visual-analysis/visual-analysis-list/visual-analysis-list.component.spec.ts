import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualAnalysisListComponent } from './visual-analysis-list.component';

describe('VisualAnalysisListComponent', () => {
  let component: VisualAnalysisListComponent;
  let fixture: ComponentFixture<VisualAnalysisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualAnalysisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
