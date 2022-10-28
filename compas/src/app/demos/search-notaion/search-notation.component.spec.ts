import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotaionComponent } from './search-notation.component';

describe('SearchNotaionComponent', () => {
  let component: SearchNotaionComponent;
  let fixture: ComponentFixture<SearchNotaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNotaionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNotaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
