import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
import { ExercisesService } from 'src/app/_services/gym/exercises.service';
import { MessageService } from '../message.service';
import { FormAlertService } from '../form-alert.service';
import { FormGroup } from '@angular/forms';
import { MessageRespones } from 'src/app/_common/types';
const gymUrl = API + "gym/exercise/categories/";

@Injectable({
  providedIn: 'root'
})
export class ExercisesCategoriesService {
  categories: any;
  workout: any;
  exerciseCategory: any = {
    name_ar: '',
    name: ''
  };

  isLoading = true;
  hasError = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private exerciseSrv: ExercisesService,
    private messageSrv: MessageService,
    private formAlert: FormAlertService,
    private logger: LoggerService) {
    this.exerciseSrv.getExerciseList()
  }


  private _getExerciseCategoriesList() {
    return this.httpClient.get(gymUrl + "list")
  }

  private _getExercisetCategoriesById(id: string) {
    return this.httpClient.get(gymUrl + "id/" + id);
  }
  private _createExercisesCategory(data: any) {

    return this.httpClient.post(gymUrl + "create", data);
  }
  private _updateExercisesCategoryById(data: any, id: string) {

    return this.httpClient.patch(gymUrl + "id/" + id, data);
  }
  private _deleteExerciseCategoryById(id: string) {
    return this.httpClient.delete(gymUrl + "id/" + id);
  }

  public getExerciseCategoriesList() {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this.isLoading = true;
      this.hasError = false;
      setTimeout(() => {
        this._getExerciseCategoriesList().subscribe((success: any) => {
          let count = 1;
          this.categories = success;

          this.categories.forEach((e: any) => {
            e.total_items = this.exerciseSrv.getExerciseListOnSameCategory(e.name_ar).length
            e.pos = count++
          })

          this.loaded()
          this.logger.log("get Exercise List:", success)
          resolve({ status: 'Success', message: 'Complete', method: 'getExerciseCategoriesList' })
        }, (error: HttpErrorResponse) => {
          this.hasError = false;
          this.errorMsg(error, undefined, false).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getExerciseCategoriesList' })
          )
          this.logger.error("get Exercise List error: ", error)
        })
      }, 500)
    })
  }

  public getExercisetCategoriesById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._getExercisetCategoriesById(id).subscribe((success: any) => {
        this.exerciseCategory = success;
        this.logger.log("get exercise by id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getExerciseCategoriesList' })
      }, (error: HttpErrorResponse) => {
        this.logger.error("get exercise by id error: ", error)
        this.errorMsg(error, undefined, false).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getExerciseCategoriesList' })
        )
      })
    })
  }

  public createExercisesCategory(data: any, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._createExercisesCategory(data).subscribe((success: any) => {
        this.messageSrv.successMessage('WORKOUT.new-category').then(msg => this.toastSrv.success(msg))
        this.getExerciseCategoriesList();
        this.logger.log("create exercises:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getExerciseCategoriesList' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, form, false, 'new-category').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getExerciseCategoriesList' }))
        this.logger.error("create exercises error: ", error)
      })
    })

  }
  public updateExercisesCategoryById(data: any, id: string, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._updateExercisesCategoryById(data, id).subscribe((success: any) => {
        this.getExerciseCategoriesList()
        this.translateSrv.get('SUCCESS.WORKOUT.update-category').subscribe(msg => this.toastSrv.success(msg))
        this.logger.log("update exercises By Id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getExerciseCategoriesList' })
      }, (error: HttpErrorResponse) => {
        this.logger.error("update exercises By Id error: ", error)
        this.errorMsg(error, form, false, 'update-category').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getExerciseCategoriesList' }))
      })
    })

  }
  public deleteExerciseCategoryById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._deleteExerciseCategoryById(id).subscribe((success: any) => {
        this.translateSrv.get('SUCCESS.WORKOUT.delete-category').subscribe(msg => this.toastSrv.success(msg))
        this.getExerciseCategoriesList()
        this.logger.log("delete exercises By Id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getExerciseCategoriesList' })

      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, undefined, false, 'delete-category').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getExerciseCategoriesList' }))
        this.logger.error("delete exercises By Id error: ", error)
      })
    })

  }
  loaded() {
    setTimeout(() => { this.isLoading = false }, 500)
  }
  private errorMsg(error: HttpErrorResponse, form?: FormGroup, useAlert = false, altMessag: string = '') {
    return new Promise((resolse, rej) => {

      this.messageSrv.errors(error, 'WORKOUT.', 'GENRAL.', altMessag, false).then(res => {
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
