import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
import { CategoryFood } from './../../_common/types';

const foodUrl = API + "diet/food/categories/"
@Injectable({
  providedIn: 'root'
})
export class FoodCategoriesService {
  categories: CategoryFood[] = [];
  category: any;

  isLoading = true;
  hasError = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toaterSrv: ToastService,
    private logger: LoggerService) { }
  checkOfCategories() {
    if (this.categories === undefined)
      this.router.navigateByUrl('/categories')
  }
  private _getFoodCategoriesList() {
    return this.httpClient.get(foodUrl + "list")
  }
  private _getFoodCategoriesById(id: string) {
    return this.httpClient.get(foodUrl + "id/" + id);
  }

  private _createFoodCategory(data: any) {

    return this.httpClient.post(foodUrl + "create", data);
  }
  private _updateFoodCategoriesById(data: any, id: string) {
    // const formData = new FormData();
    // formData.append('media_link', data.media_link);
    // formData.append('category', data.category);

    return this.httpClient.patch(foodUrl + "id/" + id, data);
  }
  private _deleteFoodCategoriesById(id: string) {
    return this.httpClient.delete(foodUrl + "id/" + id);
  }

  public getFoodCategoriesList() {
    this.isLoading = true;
    this.hasError = false;

    this._getFoodCategoriesList().subscribe((success: any) => {
      this.loaded()
      this.categories = success;
      this.logger.log("get food categories List:", success)
    }, (error: HttpErrorResponse) => {
      this.hasError = true
      this.logger.error("get food categories List error: ", error)
    })
  }
  public __getFoodCategoriesList() {
    return this._getFoodCategoriesList()
  }
  public getFoodCategoriesById(id: string) {
    this._getFoodCategoriesById(id).subscribe((success: any) => {
      this.logger.log("get food list by  id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get food list by  id error: ", error)
    })
  }

  public createFoodCategory(data: any) {
    this._createFoodCategory(data).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.CATEGORY.new-cate').subscribe(msg => this.toaterSrv.success(msg))
      this.getFoodCategoriesList()
      this.logger.log("create food category:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.CATEGORY.new-cate').subscribe(msg => this.toaterSrv.error(msg))
      this.logger.error("create food category error: ", error)
    })
  }
  public updateFoodCategoriesById(data: any, id: string) {
    this._updateFoodCategoriesById(data, id).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.CATEGORY.update-cate').subscribe(msg => this.toaterSrv.success(msg))
      this.getFoodCategoriesList();
      this.logger.log("update food categories By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.CATEGORY.update-cate').subscribe(msg => this.toaterSrv.error(msg))
      this.logger.error("update food categories By Id error: ", error)
    })
  }
  public deleteFoodCategoriesById(id: string) {
    this._deleteFoodCategoriesById(id).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.CATEGORY.delete-cate').subscribe(msg => this.toaterSrv.success(msg))
      this.getFoodCategoriesList()
      this.logger.log("delete Food Categories By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.CATEGORY.delete-cate').subscribe(msg => this.toaterSrv.error(msg))

      this.logger.error("delete Food Categories By Id error: ", error)
    })
  }


  loaded() {
    setTimeout(() => this.isLoading = false, 500)
  }
}
