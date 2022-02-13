import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { FormAlertService } from '../form-alert.service';
import { LoggerService } from '../logger.service';
import { MessageService } from '../message.service';
import { ToastService } from '../toast.service';
import { MessageRespones } from 'src/app/_common/types';
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
    private toastSrv: ToastService,
    private messageSrv: MessageService,
    private formAlert: FormAlertService
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
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._getFoodItemList().subscribe((success: any) => {
        this.foodItems = success;
        this.logger.log("get food item List:", success)
        resolve({ status: 'Success', message: 'Compelete', method: 'getFoodItemList' })
      }, (error: HttpErrorResponse) => {
        this.logger.error("get food item List error: ", error)

        this.errorMsg(error).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getFoodItemList' }))
      })
    })

  }
  public getFoodItemById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._getFoodItemById(id).subscribe((success: any) => {
        this.logger.log("get food item by  id:", success)
        resolve({ status: 'Success', message: 'Compelete', method: 'getFoodItemById' })

      }, (error: HttpErrorResponse) => {
        this.logger.error("get food item by  id error: ", error)

        this.errorMsg(error).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getFoodItemById' }))
      })
    })
  }
  public getFoodItemListByCategoryFilter(fillter: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._getFoodItemListByCategoryFilter(fillter).subscribe((success: any) => {
        this.logger.log("get food item list by category filter :", success)
        resolve({ status: 'Success', message: 'Compelete', method: 'getFoodItemListByCategoryFilter' })
      }, (error: HttpErrorResponse) => {
        this.logger.error("get food item list by category filter  error: ", error)
        this.errorMsg(error).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getFoodItemListByCategoryFilter' }))
      })
    })
  }

  public createFoodItem(data: any, form: FormGroup, media_link?: File) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._createFoodItem(data, media_link).subscribe((success: any) => {
        this.messageSrv.successMessage('CATEGORY.new-item').then(msg => this.toastSrv.success(msg))
        this.getFoodItemList()
        resolve({ status: 'Success', message: 'Compelete', method: 'createFoodItem' })
        this.logger.log("create food items:", success)
      }, (error: HttpErrorResponse) => {
        this.translateSrv.get('ERROR.CATEGORY.new-item').subscribe(msg => this.toastSrv.error(msg))
        this.logger.error("create food items error: ", error)
        this.errorMsg(error, form).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'createFoodItem' }))
      })
    })
  }
  public updateFoodItemById(data: any, id: string, form: FormGroup, media_link?: File) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._updateFoodItemById(data, id, media_link).subscribe((success: any) => {
        this.messageSrv.successMessage('CATEGORY.update-item').then(msg => this.toastSrv.success(msg))
        this.getFoodItemList()
        resolve({ status: 'Success', message: 'Compelete', method: 'updateFoodItemById' })
        this.logger.log("update food item By Id:", success)
      }, (error: HttpErrorResponse) => {
        this.logger.error("update food item By Id error: ", error)
        this.errorMsg(error, form, false, 'update-item').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'updateFoodItemById' }))
      })
    })
  }
  public deleteFoodItemById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._deleteFoodItemById(id).subscribe((success: any) => {
        this.messageSrv.successMessage('CATEGORY.delete-item').then(msg => this.toastSrv.success(msg))
        this.getFoodItemList();
        resolve({ status: 'Success', message: 'Compelete', method: 'deleteFoodItemById' })
        this.logger.log("delete Food Item By Id:", success)
      }, (error: HttpErrorResponse) => {
        this.logger.error("delete Food Item By Id error: ", error)
        this.errorMsg(error, undefined, false, 'delete-item').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'deleteFoodItemById' }))
      })
    })
  }
  public getItemsWithSameCategory(category: string) {
    return this.foodItems.filter(item => item.category === category)
  }


  private errorMsg(error: HttpErrorResponse, form?: FormGroup, useAlert = false, altMessage: string = '') {
    return new Promise((resolse, rej) => {

      this.messageSrv.errors(error, 'CATEGORY.', 'GENRAL.', altMessage, false).then(res => {
        if (form) {
          this.logger.log('res errors: ', res)
          let { controlErrors, notKey } = this.formAlert.setErrors(form, res.keySet, res.errors);
          this.toastSrv.errors(notKey)
          resolse({ controlErrors: controlErrors, notKey: notKey, keySet: res.keySet, errors: res.errors })
        } else if (useAlert) {
          this.toastSrv.error(res.errors)
          resolse({ keySet: res.keySet, errors: res.errors })

        } else {
          resolse({ keySet: res.keySet, errors: res.errors })
        }
      })
    })

  }
}
