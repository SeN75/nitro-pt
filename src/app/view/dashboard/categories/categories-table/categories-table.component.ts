import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/_services/dialog.service';
import { FoodItemsService } from 'src/app/_services/dite/food-items.service';
import { FoodUnitsService } from 'src/app/_services/dite/food-units.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
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
    public foodUnitsSrv: FoodUnitsService,
    private router: Router,
    private logger: LoggerService,
    public lang: LanguageService) {
    this.categoryId = this.router.url.replace('/categories/', '').replace('/compounds', '');
    this.logger.log('category id: ', this.categoryId)
    this.categorySrv.getFoodCategoriesById(this.categoryId)
    this.foodItemSrv.getFoodItemList()
    this.foodUnitsSrv.getFoodUnitsList();
  }

  ngOnInit(): void {
    this.categorySrv.checkOfCategories()
  }


}
