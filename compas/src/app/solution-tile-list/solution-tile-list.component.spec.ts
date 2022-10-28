import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionTileListComponent } from './solution-tile-list.component';

describe('SolutionTileListComponent', () => {
  let component: SolutionTileListComponent;
  let fixture: ComponentFixture<SolutionTileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionTileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionTileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
