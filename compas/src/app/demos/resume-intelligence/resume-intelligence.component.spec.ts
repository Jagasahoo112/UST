import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeIntelligenceComponent } from './resume-intelligence.component';

describe('ResumeIntelligenceComponent', () => {
  let component: ResumeIntelligenceComponent;
  let fixture: ComponentFixture<ResumeIntelligenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeIntelligenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeIntelligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
