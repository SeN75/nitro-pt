import { Component, OnInit } from '@angular/core';
import { categoriesWithcompounds } from 'src/app/_common/globle';
import { DialogService } from './../../../_services/dialog.service';
import { Router } from '@angular/router';
import { FoodCategoriesService } from '../../../_services/dite/food-categories.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { FoodItemsService } from 'src/app/_services/dite/food-items.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = categoriesWithcompounds;
  dtOptions: DataTables.Settings = {};

  constructor(
    public dialogSrv: DialogService,
    public categorySrv: FoodCategoriesService,
    public categoryItemSrv: FoodItemsService,
    private router: Router,
    public lang: LanguageService,

    private logger: LoggerService) {
    this.categorySrv.getFoodCategoriesList()
    this.categoryItemSrv.getFoodItemList()
  }

  ngOnInit(): void {
    this.dtOptions = {
      // ajax: 'data/data.json',
      columns: [
      ],
    };
  }
  showCompunds(cat: any) {
    this.categorySrv.category = cat;
    this.router.navigateByUrl(`/categories/${cat.id}/compounds`);
  }
}
