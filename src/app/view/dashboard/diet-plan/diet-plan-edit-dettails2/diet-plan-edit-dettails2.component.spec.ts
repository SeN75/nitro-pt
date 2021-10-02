import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlanEditDettails2Component } from './diet-plan-edit-dettails2.component';

describe('DietPlanEditDettails2Component', () => {
  let component: DietPlanEditDettails2Component;
  let fixture: ComponentFixture<DietPlanEditDettails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPlanEditDettails2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPlanEditDettails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
