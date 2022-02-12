import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportingComponent } from './sporting.component';

describe('SportingComponent', () => {
  let component: SportingComponent;
  let fixture: ComponentFixture<SportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
