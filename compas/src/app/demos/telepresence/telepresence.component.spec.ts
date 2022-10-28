import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelepresenceComponent } from './telepresence.component';

describe('TelepresenceComponent', () => {
  let component: TelepresenceComponent;
  let fixture: ComponentFixture<TelepresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelepresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelepresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
