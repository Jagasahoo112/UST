import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligentMomExtractionComponent } from './intelligent-mom-extraction.component';

describe('IntelligentMomExtractionComponent', () => {
  let component: IntelligentMomExtractionComponent;
  let fixture: ComponentFixture<IntelligentMomExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligentMomExtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligentMomExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
