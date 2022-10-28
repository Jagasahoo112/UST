import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatavisualizationComponent } from './datavisualization.component';

describe('DatavisualizationComponent', () => {
  let component: DatavisualizationComponent;
  let fixture: ComponentFixture<DatavisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatavisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatavisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
