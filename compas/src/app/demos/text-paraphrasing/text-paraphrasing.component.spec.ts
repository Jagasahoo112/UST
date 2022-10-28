import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextParaphrasingComponent } from './text-paraphrasing.component';

describe('TextParaphrasingComponent', () => {
  let component: TextParaphrasingComponent;
  let fixture: ComponentFixture<TextParaphrasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextParaphrasingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextParaphrasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
