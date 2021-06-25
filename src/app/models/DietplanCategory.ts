export class DietplanCategory{
    category_name: String;
    category_count: number;
    category_calories: number;
    category_protein : number;
    category_carbs : number;
    category_fat : number;
    category_protein_gram : number;
    category_carbs_gram : number;
    category_fat_gram : number;
    constructor() {
        this.category_name = '';
        this.category_count = 0;
        this.category_calories = 0;
        this.category_protein = 0;
        this.category_carbs = 0;
        this.category_fat = 0;
        this.category_protein_gram = 0;
        this.category_carbs_gram = 0;
        this.category_fat_gram = 0;
    }
}