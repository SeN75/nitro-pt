import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/_services/dialog.service';
import { FoodItemsService } from 'src/app/_services/dite/food-items.service';
import { LanguageService } from 'src/app/_services/language.service';
import { FoodCategoriesService } from '../../../../_services/dite/food-categories.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {
  categoryId: string;
  search: any;
  constructor(
    public dialogSrv: DialogService,
    public categorySrv: FoodCategoriesService,
    public foodItemSrv: FoodItemsService,
    private router: Router,
    public lang: LanguageService) {
    this.categoryId = this.router.url.split('/')[2];
    this.categorySrv.getFoodCategoriesById(this.categoryId)
    this.foodItemSrv.getFoodItemList()
  }

  ngOnInit(): void {
    this.categorySrv.checkOfCategories()
  }


}
