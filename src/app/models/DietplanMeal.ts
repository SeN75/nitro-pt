import { DietplanCategory } from "./DietplanCategory";

export class DietplanMeal{
    meal_name: String;
    meal_categories_count: number;
    meal_calories_count: number;
    meal_categories: DietplanCategory[];

    constructor() {
        this.meal_name = '';
        this.meal_calories_count = 0;
        this.meal_categories_count = 0;
        this.meal_categories = [];
    }
}