import { DietplanMeal } from "./DietplanMeal";

export class DietplanTable{
    table_name: String;
    calories_count: number;
    protein_count: number;
    carbs_count: number;
    fat_count: number;
    meals : DietplanMeal[];
    constructor() {
        this.table_name = '';
        this.calories_count = 0;
        this.protein_count = 0;
        this.carbs_count = 0;
        this.fat_count = 0;
        this.meals = [];
    }
}