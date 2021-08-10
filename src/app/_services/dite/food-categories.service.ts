import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { LoggerService } from '../logger.service';
const foodUrl = API + "diet/food/categories/"
@Injectable({
  providedIn: 'root'
})
export class FoodCategoriesService {
  categories: any;
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
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
    const formData = new FormData();
    formData.append('media_link', data.media_link);
    formData.append('category', data.category);

    return this.httpClient.patch(foodUrl + "items/id/" + id, formData);
  }
  private _deleteFoodCategoriesById(id: string) {
    return this.httpClient.delete(foodUrl + "items/id/" + id);
  }

  public getFoodCategoriesList() {
    this._getFoodCategoriesList().subscribe((success: any) => {
      this.logger.log("get food categories List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get food categories List error: ", error)
    })
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
      this.logger.log("create food category:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("create food category error: ", error)
    })
  }
  public updateFoodCategoriesById(data: any, id: string) {
    this._updateFoodCategoriesById(data, id).subscribe((success: any) => {
      this.logger.log("update food categories By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("update food categories By Id error: ", error)
    })
  }
  public deleteFoodCategoriesById(id: string) {
    this._deleteFoodCategoriesById(id).subscribe((success: any) => {
      this.logger.log("delete Food Categories By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("delete Food Categories By Id error: ", error)
    })
  }
}
