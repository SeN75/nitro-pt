import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlanViewDetailsComponent } from './diet-plan-view-details.component';

describe('DietPlanViewDetailsComponent', () => {
  let component: DietPlanViewDetailsComponent;
  let fixture: ComponentFixture<DietPlanViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietPlanViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPlanViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
