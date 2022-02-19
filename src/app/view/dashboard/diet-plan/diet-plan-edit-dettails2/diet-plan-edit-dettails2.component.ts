import { Component, OnInit } from '@angular/core';
import { DietPlanService } from 'src/app/_services/dite/diet-plan.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/_services/logger.service';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'app-diet-plan-edit-dettails2',
  templateUrl: './diet-plan-edit-dettails2.component.html',
  styleUrls: ['./diet-plan-edit-dettails2.component.scss']
})
export class DietPlanEditDettails2Component implements OnInit {

  programName: string = '';

  addingNewTable = false;
  addingNewMeal = false;
  addingNewItem = false;

  selectedTable = '';
  selectedMeal = '';

  newTableName: FormControl = new FormControl('');
  newMealName: FormControl = new FormControl('');

  programs: any[] = [];
  constructor(
    private dietplanSrv: DietPlanService,
    private router: Router,
    public dialogSrv: DialogService,
    private logger: LoggerService) {
    if (!this.dietplanSrv.selectProgram) {
      this.logger.log('ddd')
      this.router.navigateByUrl('/dashboard/diet')
    }
    else {
      this.programs = this.dietplanSrv.selectedTable
      this.programName = this.dietplanSrv.selectProgram.name

    }
  }

  ngOnInit(): void {
  }
  addTable() {
    if (this.newTableName.value) {
      this.programs.push({ name: this.newTableName.value, meals: [], total_calories: 0 })
      this.logger.log('new program: ', this.programs)
    }
  }
  addMeal(tabelIndex: number) {
    if (this.newMealName.value)
      this.programs[tabelIndex].meals.push({ name: this.newTableName.value, calories: 0, items: [] })
  }
}
