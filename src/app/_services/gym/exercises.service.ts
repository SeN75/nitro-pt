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

const gymUrl = API + "gym/exercise/";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  workout: any;
  exerciseSchedule: any[] = [];

  isLoading = true;
  hasError = false;
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private logger: LoggerService,
    private messageSrv: MessageService,
    private formAlert: FormAlertService) {
    this.getExerciseList()
  }
  checkWorkout() {
    if (this.workout === undefined)
      this.router.navigateByUrl('/worksout');
  }

  private _getExerciseList() {
    return this.httpClient.get(gymUrl + "items/list")
  }
  private _getExerciseListByCoachId(id: string) {
    return this.httpClient.get(gymUrl + "items/coach/" + id);
  }
  private _getExercisetById(id: string) {
    return this.httpClient.get(gymUrl + "items/id/" + id);
  }
  private _createExercises(data: any, media_link: File) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('name_ar', data.name_ar);
    formData.append('category', data.category);
    formData.append('media_link', media_link);
    this.logger.log('media_link: ', media_link)
    // formData.append('media_link', data.media_link, `file-${filename}.jpg`);
    return this.httpClient.post(gymUrl + "items/create", formData);
  }
  private _updateExercisesById(data: any, id: string, media_link?: File) {
    const formData = new FormData();
    if (media_link)
      if (media_link instanceof File)
        formData.append("media_link", media_link,);
    formData.append('category', data.category);
    formData.append('name', data.name);
    formData.append('name_ar', data.name_ar);

    return this.httpClient.patch(gymUrl + "items/id/" + id, formData);
  }
  private _deleteExercisesById(id: string) {
    return this.httpClient.delete(gymUrl + "items/id/" + id);
  }

  public getExerciseList() {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this.isLoading = true;
      this.hasError = false;
      this._getExerciseList().subscribe((success: any) => {
        let pos = 1;
        this.exerciseSchedule = success;
        this.exerciseSchedule.forEach(e => e.pos = pos++);
        this.loaded()
        this.logger.log("get Exercise List:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getExerciseList' })
      }, (error: HttpErrorResponse) => {
        this.hasError = true;
        this.logger.error("get Exercise List error: ", error)
        this.errorMsg(error).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getExerciseList' }))
      })
    })
  }
  public getExerciseListByCoachId(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._getExerciseListByCoachId(id).subscribe((success: any) => {
        this.logger.log("get exercise list by coach id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getExerciseListByCoachId' })

      }, (error: HttpErrorResponse) => {
        this.logger.error("get exercise list by coach id error: ", error)
        this.errorMsg(error).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getExerciseListByCoachId' }));
      })
    })

  }
  public getExercisetById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._getExercisetById(id).subscribe((success: any) => {
        this.logger.log("get exercise by id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'getExercisetById' })

      }, (error: HttpErrorResponse) => {
        this.errorMsg(error).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getExercisetById' }));
        this.logger.error("get exercise by id error: ", error)
      })
    })
  }

  public createExercises(data: any, media_link: File, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._createExercises(data, media_link).subscribe((success: any) => {
        this.translateSrv.get("SUCCESS.WORKOUT.new-exercise").subscribe(msg => this.toastSrv.success(msg))
        this.getExerciseList();
        this.logger.log("create exercises:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'createExercises' })

      }, (error: HttpErrorResponse) => {
        this.translateSrv.get("ERROR.WORKOUT.new-exercise").subscribe(msg => this.toastSrv.success(msg))
        this.errorMsg(error, form, false, 'new-exercise').then(msgs => rejects({ status: 'Failed', message: msgs, method: 'createExercises' }));
        this.logger.error("create exercises error: ", error)
      })
    })
  }
  public updateExercisesById(data: any, id: string, form: FormGroup, media_link?: File,) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._updateExercisesById(data, id, media_link).subscribe((success: any) => {
        this.translateSrv.get("SUCCESS.WORKOUT.update-exercise").subscribe(msg => this.toastSrv.success(msg))
        this.getExerciseList();
        this.logger.log("update exercises By Id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'updateExercisesById' })

      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, form).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'updateExercisesById' }));
        this.logger.error("update exercises By Id error: ", error)
      })
    })
  }
  public deleteExercisesById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._deleteExercisesById(id).subscribe((success: any) => {
        this.translateSrv.get("SUCCESS.WORKOUT.delete-exercise").subscribe(msg => this.toastSrv.success(msg))
        this.getExerciseList();
        this.logger.log("delete exercises By Id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'deleteExercisesById' })

      }, (error: HttpErrorResponse) => {
        this.translateSrv.get("ERROR.WORKOUT.delete-exercise").subscribe(msg => this.toastSrv.error(msg))
        this.getExerciseList();
        this.errorMsg(error).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'deleteExercisesById' }));
        this.logger.error("delete exercises By Id error: ", error)
      })
    })
  }

  public getExerciseListOnSameCategory(id: string) {
    return this.exerciseSchedule.filter(ex => {
      return ex.category == id
    });
  }

  loaded() {
    setTimeout(() => this.isLoading = false, 500)
  }
  private errorMsg(error: HttpErrorResponse, form?: FormGroup, useAlert = false, altMessage: string = '') {
    return new Promise((resolse, rej) => {

      this.messageSrv.errors(error, 'WORKOUT.', 'GENRAL.', altMessage, false).then(res => {
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
