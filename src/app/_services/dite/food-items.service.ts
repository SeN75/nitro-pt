import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { LoggerService } from '../logger.service';
const foodUrl = API + "diet/food/items/"

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService
  ) { }
  private _getFoodItemList() {
    return this.httpClient.get(foodUrl + "list")
  }
  private _getFoodItemById(id: string) {
    return this.httpClient.get(foodUrl + "id/" + id);
  }
  private _getFoodItemListByCategoryFilter(filter: string) {
    return this.httpClient.get(foodUrl + "list?category=" + filter);
  }

  private _createFoodItem(data: any) {

    return this.httpClient.post(foodUrl + "create", data);
  }
  private _updateFoodItemById(data: any, id: string) {
    const formData = new FormData();
    formData.append('media_link', data.media_link);
    formData.append('category', data.category);

    return this.httpClient.patch(foodUrl + "id/" + id, formData);
  }
  private _deleteFoodItemById(id: string) {
    return this.httpClient.delete(foodUrl + "id/" + id);
  }

  public getFoodItemList() {
    this._getFoodItemList().subscribe((success: any) => {
      this.logger.log("get food item List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get food item List error: ", error)
    })
  }
  public getFoodItemById(id: string) {
    this._getFoodItemById(id).subscribe((success: any) => {
      this.logger.log("get food item by  id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get food item by  id error: ", error)
    })
  }
  public getFoodItemListByCategoryFilter(fillter: string) {
    this._getFoodItemListByCategoryFilter(fillter).subscribe((success: any) => {
      this.logger.log("get food item list by category filter :", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get food item list by category filter  error: ", error)
    })
  }

  public createFoodItem(data: any) {
    this._createFoodItem(data).subscribe((success: any) => {
      this.logger.log("create food items:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("create food items error: ", error)
    })
  }
  public updateFoodItemById(data: any, id: string) {
    this._updateFoodItemById(data, id).subscribe((success: any) => {
      this.logger.log("update food item By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("update food item By Id error: ", error)
    })
  }
  public deleteFoodItemById(id: string) {
    this._deleteFoodItemById(id).subscribe((success: any) => {
      this.logger.log("delete Food Item By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("delete Food Item By Id error: ", error)
    })
  }
}
