import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
const foodUrl = API + "diet/food/items/"

@Injectable({
  providedIn: 'root'
})
export class FoodItemsService {
  foodItems: any[] = [];
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService,
    private toasterSrv: ToastService
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

  private _createFoodItem(data: any, media_link?: File) {
    let file: File;

    const formData = new FormData();

    formData.append('name', data.name)
    formData.append('name_ar', data.name_ar)
    formData.append('fat', data.fat)
    formData.append('protien', data.protien)
    formData.append('carb', data.carb)
    formData.append('calories', data.calories)
    formData.append('category', data.category)
    formData.append('unit', data.unit)
    if (media_link) {
      formData.append('media_link', media_link)
      this.logger.log('media_link: ', media_link)
    }
    this.logger.log('data: ', data)
    return this.httpClient.post(foodUrl + "create", formData);
  }
  private _updateFoodItemById(data: any, id: string, media_link?: File) {
    const formData = new FormData();
    if (data.name)
      formData.append('name', data.name);
    if (data.name_ar)
      formData.append('name_ar', data.name_ar);
    if (data.protien)
      formData.append('protien', data.protien);
    if (data.carb)
      formData.append('carb', data.carb);
    if (data.fat)
      formData.append('fat', data.fat);
    if (data.calories)
      formData.append('calories', data.calories);
    if (data.category)
      formData.append('category', data.category);
    if (data.unit)
      formData.append('unit', data.unit);
    if (media_link)
      formData.append('media_link', media_link);

    return this.httpClient.patch(foodUrl + "id/" + id, formData);
  }
  private _deleteFoodItemById(id: string) {
    return this.httpClient.delete(foodUrl + "id/" + id);
  }

  public getFoodItemList() {
    this._getFoodItemList().subscribe((success: any) => {
      this.foodItems = success;
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

  public createFoodItem(data: any, media_link?: File) {
    this._createFoodItem(data, media_link).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.CATEGORY.new-item').subscribe(msg => this.toasterSrv.success(msg))
      this.getFoodItemList()
      this.logger.log("create food items:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.CATEGORY.new-item').subscribe(msg => this.toasterSrv.error(msg))
      this.logger.error("create food items error: ", error)
    })
  }
  public updateFoodItemById(data: any, id: string, media_link?: File) {
    this._updateFoodItemById(data, id, media_link).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.CATEGORY.update-item').subscribe(msg => this.toasterSrv.success(msg))
      this.getFoodItemList()
      this.logger.log("update food item By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.CATEGORY.update-item').subscribe(msg => this.toasterSrv.error(msg))
      this.logger.error("update food item By Id error: ", error)
    })
  }
  public deleteFoodItemById(id: string) {
    this._deleteFoodItemById(id).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.CATEGORY.delete-item').subscribe(msg => this.toasterSrv.success(msg))
      this.getFoodItemList()
      this.logger.log("delete Food Item By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.CATEGORY.delete-item').subscribe(msg => this.toasterSrv.error(msg))
      this.logger.error("delete Food Item By Id error: ", error)
    })
  }
  public getItemsWithSameCategory(category: string) {
    return this.foodItems.filter(item => item.category === category)
  }
}
