import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';

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
    private toasteSrv: ToastService,
    private logger: LoggerService) {
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
    this.isLoading = true;
    this.hasError = false;
    this._getExerciseList().subscribe((success: any) => {
      this.exerciseSchedule = success;
      this.loaded()
      this.logger.log("get Exercise List:", success)
    }, (error: HttpErrorResponse) => {
      this.hasError = true;
      this.logger.error("get Exercise List error: ", error)
    })
  }
  public getExerciseListByCoachId(id: string) {
    this._getExerciseListByCoachId(id).subscribe((success: any) => {
      this.logger.log("get exercise list by coach id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get exercise list by coach id error: ", error)
    })
  }
  public getExercisetById(id: string) {
    this._getExercisetById(id).subscribe((success: any) => {
      this.logger.log("get exercise by id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get exercise by id error: ", error)
    })
  }

  public createExercises(data: any, media_link: File) {
    this._createExercises(data, media_link).subscribe((success: any) => {
      this.translateSrv.get("SUCCESS.WORKOUT.new-exercise").subscribe(msg => this.toasteSrv.success(msg))
      this.getExerciseList();
      this.logger.log("create exercises:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get("ERROR.WORKOUT.new-exercise").subscribe(msg => this.toasteSrv.success(msg))

      this.logger.error("create exercises error: ", error)
    })
  }
  public updateExercisesById(data: any, id: string, media_link?: File) {
    this._updateExercisesById(data, id, media_link).subscribe((success: any) => {
      this.translateSrv.get("SUCCESS.WORKOUT.update-exercise").subscribe(msg => this.toasteSrv.success(msg))
      this.getExerciseList();
      this.logger.log("update exercises By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("update exercises By Id error: ", error)
    })
  }
  public deleteExercisesById(id: string) {
    this._deleteExercisesById(id).subscribe((success: any) => {
      this.translateSrv.get("SUCCESS.WORKOUT.delete-exercise").subscribe(msg => this.toasteSrv.success(msg))
      this.getExerciseList();
      this.logger.log("delete exercises By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get("ERROR.WORKOUT.delete-exercise").subscribe(msg => this.toasteSrv.error(msg))
      this.getExerciseList();
      this.logger.error("delete exercises By Id error: ", error)
    })
  }

  public getExerciseListOnSameCategory(id: string) {
    this.logger.log('ss', id)
    return this.exerciseSchedule.filter(ex => {
      return ex.category == id
    });
  }

  loaded() {
    setTimeout(() => this.isLoading = false, 500)
  }
}
