import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligentSearchComponent } from './intelligent-search.component';

describe('IntelligentSearchComponent', () => {
  let component: IntelligentSearchComponent;
  let fixture: ComponentFixture<IntelligentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
