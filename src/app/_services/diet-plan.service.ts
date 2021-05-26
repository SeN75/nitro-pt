import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DietPlanService {
  dietPlanOjbect = {
    calories:2000,
    protein:40,
    carbs:40,
    fat:20
  }
  constructor() { }
}
