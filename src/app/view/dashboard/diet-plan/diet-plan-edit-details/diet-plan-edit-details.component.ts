import { Component, OnInit } from '@angular/core';
import { DietPlanService } from './../../../../_services/diet-plan.service';

@Component({
  selector: 'app-diet-plan-edit-details',
  templateUrl: './diet-plan-edit-details.component.html',
  styleUrls: ['./diet-plan-edit-details.component.scss']
})
export class DietPlanEditDetailsComponent implements OnInit {
  calories : number = 0;
  protein : number = 0;
  carbs : number = 0;
  fat : number = 0;
  constructor(private dietplan_service:DietPlanService) {
    this.calories = dietplan_service.dietPlanOjbect.calories;
    this.protein = dietplan_service.dietPlanOjbect.protein;
    this.carbs = dietplan_service.dietPlanOjbect.carbs;
    this.fat = dietplan_service.dietPlanOjbect.fat;
  }

  ngOnInit(): void {
  }

}
