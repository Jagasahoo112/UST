import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligentMomSummaryComponent } from './intelligent-mom-summary.component';

describe('IntelligentMomSummaryComponent', () => {
  let component: IntelligentMomSummaryComponent;
  let fixture: ComponentFixture<IntelligentMomSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligentMomSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligentMomSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
