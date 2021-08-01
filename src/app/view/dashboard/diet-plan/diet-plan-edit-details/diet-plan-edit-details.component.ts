import { Component, OnInit } from '@angular/core';
import { DietPlanService } from './../../../../_services/diet-plan.service';
import { categories } from '../../../../_common/globle';
import { DietplanTable } from '../../../../models/DietplanTable';
import { DietplanMeal } from '../../../../models/DietplanMeal';
import { DietplanCategory } from 'src/app/models/DietplanCategory';

@Component({
  selector: 'app-diet-plan-edit-details',
  templateUrl: './diet-plan-edit-details.component.html',
  styleUrls: ['./diet-plan-edit-details.component.scss'],
})

export class DietPlanEditDetailsComponent implements OnInit {
  calories: number = 0;
  protein: number = 0;
  carbs: number = 0;
  fat: number = 0;


  public table_name : String = '';
  public calories_count: number = 0;
  public protein_count: number = 0;
  public carbs_count: number = 0;
  public fat_count: number = 0;
  public tables : DietplanTable[] = [];
  public meals : DietplanMeal[] = [];
  public categories : DietplanCategory[] = [];

      /* When input is empty, it will
       not create a new division */
       public addTable() {
        if (this.table_name == '' && this.calories_count == 0 && this.protein_count == 0 && this.fat_count == 0) {
        }
        else {
          var table : DietplanTable = {
            table_name: this.table_name,
            calories_count: this.calories_count,
            protein_count: this.protein_count,
            carbs_count: this.carbs_count,
            fat_count: this.fat_count,
            meals : [],
          };

          this.tables.push(table);

          console.log(table)
          console.log('Added to Array Successfully')
        }
    }

    public meal_name: String = '';
    public meal_categories_count: number = 0;
    public meal_calories_count: number = 0;
    //public meal_categories: DietplanCategory[] = [];

    public meal : DietplanMeal = {
      meal_name:this.meal_name,
      meal_categories:[],
      meal_calories_count:this.meal_calories_count,
      meal_categories_count:this.meal_categories_count
    };

    public category_item = {
      category_name : '',
      category_count : 0,
      category_calories : 0,
      category_protein: 0,
      category_carbs: 0,
      category_fat: 0,
      category_protein_gram: 0,
      category_carbs_gram: 0,
      category_fat_gram: 0
    }

    public addMeal() {
      if(this.meal_name == ''){
        
      }
      else{
        this.meal.meal_name=this.meal_name
        this.meals.push(this.meal)
        console.log(this.meals)
        //this.meal_categories_count+1;
        //this.meal.meal_categories.push(this.category_item)
      }
      }
      
    

      public addCategory() {
        if(this.meal_name == ''){
          
        }
        else{
          this.meal.meal_name=this.meal_name
          this.meals.push(this.meal)
          console.log(this.meals)
          //this.meal_categories_count+1;
          //this.meal.meal_categories.push(this.category_item)
        }
        }

  constructor(private dietplan_service: DietPlanService) {
    this.calories = dietplan_service.dietPlanOjbect.calories;
    this.protein = dietplan_service.dietPlanOjbect.protein;
    this.carbs = dietplan_service.dietPlanOjbect.carbs;
    this.fat = dietplan_service.dietPlanOjbect.fat;
  }
  cate_selected = -1;
  cate_checked = false;
  categories_service = categories;

  ngOnInit(): void { }
}
