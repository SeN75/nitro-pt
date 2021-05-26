import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlanEditDetailsComponent } from './diet-plan-edit-details.component';

describe('DietPlanEditDetailsComponent', () => {
  let component: DietPlanEditDetailsComponent;
  let fixture: ComponentFixture<DietPlanEditDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPlanEditDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPlanEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
