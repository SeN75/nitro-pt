import { Component, OnInit } from '@angular/core';
import { DietPlanService } from 'src/app/_services/dite/diet-plan.service';

@Component({
  selector: 'app-diet-plan-view-details',
  templateUrl: './diet-plan-view-details.component.html',
  styleUrls: ['./diet-plan-view-details.component.scss']
})
export class DietPlanViewDetailsComponent implements OnInit {
  programName: string = "البرنامج الغدائي";
  selectedPro = '';
  selectedMeal = '';
  dietplanArr = [
    {
      name: 'جدول 1', total_calories: 2000, note: 'هذا النص توضيحي لملاحظات المدرب', meals: [
        {
          name: 'وجبة غداء', calories: 200, items: [
            { name: 'شريحة لحم', type: 'بروتين', weight: "1 شريحة" },
            { name: 'صدر دجاح', type: 'بروتين', weight: "1 شريحة" },
            { name: 'شريحة لحم', type: 'بروتين', weight: "1 شريحة" },
          ]
        }
      ]
    },
    {
      name: 'جدول 3', total_calories: 2000, note: 'لا يوجد', meals: [
        {
          name: 'وجبة غداء', calories: 200, items: [
            { name: 'شريحة لحم', type: 'بروتين', weight: "1 شريحة" },
          ]
        },
        {
          name: 'وجبة عشا', calories: 200, items: [
            { name: 'شريحة لحم', type: 'بروتين', weight: "1 شريحة" },
            { name: 'صدر دجاح', type: 'بروتين', weight: "1 شريحة" },
          ]
        },
      ]
    },
  ]
  constructor(
    private dietplanSrv: DietPlanService
  ) {
    if (this.dietplanSrv.selectProgram)
      this.programName = this.dietplanSrv.selectProgram.name;
    this.dietplanSrv.selectedTable = this.dietplanArr;
  }

  ngOnInit(): void {
  }

}
