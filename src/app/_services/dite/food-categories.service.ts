import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { FormAlertService } from '../form-alert.service';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
import { CategoryFood } from './../../_common/types';
import { MessageService } from './../message.service';
import { MessageRespones } from 'src/app/_common/types';

const foodUrl = API + "diet/food/categories/"
@Injectable({
  providedIn: 'root'
})
export class FoodCategoriesService {
  categories: CategoryFood[] = [];
  category: any = {
    name: '',
    name_ar: ''
  };

  isLoading = true;
  hasError = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private messageSrv: MessageService,
    private formAlert: FormAlertService,
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
    return new Promise<MessageRespones>((resolve, rejects) => {

      this.isLoading = true;
      this.hasError = false;

      this._getFoodCategoriesList().subscribe((success: any) => {
        let count = 1;
        this.loaded()
        this.categories = success;
        this.categories.forEach((e: any) => e.pos = count++)
        this.logger.log("get food categories List:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getFoodCategoriesList' })
      }, (error: HttpErrorResponse) => {
        this.hasError = true
        this.logger.error("get food categories List error: ", error)
        this.errorMsg(error, undefined, false).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getFoodCategoriesList' }))
      })
    })

  }
  public __getFoodCategoriesList() {
    return this._getFoodCategoriesList()
  }
  public getFoodCategoriesById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._getFoodCategoriesById(id).subscribe((success: any) => {
        this.category = success;
        this.logger.log("get food list by  id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getFoodCategoriesById' })

      }, (error: HttpErrorResponse) => {
        this.logger.error("get food list by  id error: ", error)
        this.errorMsg(error, undefined, false).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getFoodCategoriesById' }))
      })
    })
  }

  public createFoodCategory(data: any, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._createFoodCategory(data).subscribe((success: any) => {
        this.messageSrv.successMessage('CATEGORY.new-cate').then(msg => this.toastSrv.success(msg))
        this.getFoodCategoriesList()
        this.logger.log("create food category:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'createFoodCategory' })

      }, (error: HttpErrorResponse) => {
        this.logger.error("create food category error: ", error)
        this.errorMsg(error, form, false, 'new-cate').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'createFoodCategory' }))
      })
    })
  }
  public updateFoodCategoriesById(data: any, id: string, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._updateFoodCategoriesById(data, id).subscribe((success: any) => {
        this.messageSrv.successMessage('CATEGORY.update-cate').then(msg => this.toastSrv.success(msg))
        this.getFoodCategoriesList();
        this.logger.log("update food categories By Id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'updateFoodCategoriesById' })

      }, (error: HttpErrorResponse) => {
        this.logger.error("update food categories By Id error: ", error)
        this.errorMsg(error, form, false, 'update-cate').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'updateFoodCategoriesById' }))
      })
    })
  }
  public deleteFoodCategoriesById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._deleteFoodCategoriesById(id).subscribe((success: any) => {
        this.messageSrv.successMessage('CATEGORY.delete-cate').then(msg => this.toastSrv.success(msg))
        this.getFoodCategoriesList()
        this.logger.log("delete Food Categories By Id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'deleteFoodCategoriesById' })

      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, undefined, true, 'delete-cate').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'deleteFoodCategoriesById' }))
        this.logger.error("delete Food Categories By Id error: ", error)
      })
    })
  }


  loaded() {
    setTimeout(() => this.isLoading = false, 500)
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
