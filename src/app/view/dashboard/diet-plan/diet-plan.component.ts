import { DietPlanService } from '../../../_services/dite/diet-plan.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.scss']
})
export class DietPlanComponent implements OnInit {
  dietplan: number = 0;
  dtOptions: DataTables.Settings = {};

  dietPlanArr = [
    { name: 'name', calories: 1000, fat: "30", protein: "40", carp: "30" },
    { name: 'name', calories: 1000, fat: "30", protein: "40", carp: "30" },
    { name: 'name', calories: 1000, fat: "30", protein: "40", carp: "30" },
    { name: 'name', calories: 1000, fat: "30", protein: "40", carp: "30" },
    { name: 'name', calories: 1000, fat: "30", protein: "40", carp: "30" },

  ]
  constructor(
    public dietplanSrv: DietPlanService,
    public dialogSrv: DialogService,

  ) {
    this.dietplan = dietplanSrv.dietPlanOjbect.calories;
    this.dtOptions = {
      pageLength: 10,
      searching: false,
      paging: false,

    }
  }

  ngOnInit(): void {
  }

}


