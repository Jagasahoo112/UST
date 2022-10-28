import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualPlatformComponent } from './virtual-platform.component';

describe('VirtualPlatformComponent', () => {
  let component: VirtualPlatformComponent;
  let fixture: ComponentFixture<VirtualPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualPlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
