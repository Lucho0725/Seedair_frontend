import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDrone } from './save-drone';

describe('SaveDrone', () => {
  let component: SaveDrone;
  let fixture: ComponentFixture<SaveDrone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveDrone],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveDrone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
