import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DietPlanService {
  dietPlanOjbect = {
    name: 'برنامج شلبي',
    calories: 2000,
    protein: 50,
    carbs: 25,
    fat: 25,
  }
  selectedTable: any[] = [];
  selectProgram: any;
  constructor() { }
}
