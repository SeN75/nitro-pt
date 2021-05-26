import { DietPlanService } from './../../../_services/diet-plan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.scss']
})
export class DietPlanComponent implements OnInit {
  dietplan : number = 0;
  constructor(private dietplan_service:DietPlanService) {
    this.dietplan = dietplan_service.dietPlanOjbect.calories;
  }

  ngOnInit(): void {
  }

}
