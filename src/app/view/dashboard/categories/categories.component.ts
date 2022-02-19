import { Component, OnInit } from '@angular/core';
import { categoriesWithcompounds } from 'src/app/_common/globle';
import { DialogService } from './../../../_services/dialog.service';
import { Router } from '@angular/router';
import { FoodCategoriesService } from '../../../_services/dite/food-categories.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { FoodItemsService } from 'src/app/_services/dite/food-items.service';
import { CategoryFood } from 'src/app/_common/types';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CategoryTypeDialogComponent } from './category-type-dialog/category-type-dialog.component';
import { FilteringService } from './../../../_services/filtering.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: CategoryFood[] = [];
  isLoading = true;
  hasError = false;

  constructor(
    public dialogSrv: DialogService,
    public categorySrv: FoodCategoriesService,
    public categoryItemSrv: FoodItemsService,
    private router: Router,
    public lang: LanguageService,
    private dialog: MatDialog,
    private filterSrv: FilteringService,
    private logger: LoggerService) {
    // this.categorySrv.getFoodCategoriesList()
    this.getFoodCategoriesList()
    // this.categorySrv.categories = this.categories;
    this.categoryItemSrv.getFoodItemList();


  }

  ngOnInit(): void {

  }
  showCompunds(cat: any) {
    this.categorySrv.category = cat;
    this.router.navigateByUrl(`/categories/${cat.id}/compounds`);
  }
  getFoodCategoriesList() {
    this.categorySrv.getFoodCategoriesList()
    // this.categories = []
    // this.isLoading = true
    // this.hasError = false;
    // this.categorySrv.__getFoodCategoriesList().subscribe((cate: any) => {
    //   this.categories = cate;
    //   this.logger.log('categories: ', this.categories)
    //   this.loaded()
    // }, (error: HttpErrorResponse) => {
    //   this.hasError = true;
    //   this.logger.error('categories error: ', error)
    // })
  }
  loaded() {
    setTimeout(() => this.isLoading = false, 500)
  }


}
