import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { LoggerService } from '../logger.service';

const gymUrl = API + "gym/exercise/";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  workout: any;
  exerciseSchedule: any[] = [];

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService) { }
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
  private _createExercises(data: any) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('name_ar', data.name_ar);
    formData.append('category', data.category);
    formData.append('media_link', data.media_link);
    // formData.append('media_link', data.media_link, `file-${filename}.jpg`);
    return this.httpClient.post(gymUrl + "items/create", formData);
  }
  private _updateExercisesById(data: any, id: string) {
    const formData = new FormData();

    formData.append("media_link", data.media_link, data.media_link.name);
    formData.append('category', data.category);
    formData.append('name', data.name);
    formData.append('name_ar', data.name_ar);

    return this.httpClient.patch(gymUrl + "items/id/" + id, formData);
  }
  private _deleteExercisesById(id: string) {
    return this.httpClient.delete(gymUrl + "items/id/" + id);
  }

  public getExerciseList() {
    this._getExerciseList().subscribe((success: any) => {
      this.exerciseSchedule = success;
      this.logger.log("get Exercise List:", success)
    }, (error: HttpErrorResponse) => {
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

  public createExercises(data: any) {
    this._createExercises(data).subscribe((success: any) => {
      this.logger.log("create exercises:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("create exercises error: ", error)
    })
  }
  public updateExercisesById(data: any, id: string) {
    this._updateExercisesById(data, id).subscribe((success: any) => {
      this.logger.log("update exercises By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("update exercises By Id error: ", error)
    })
  }
  public deleteExercisesById(id: string) {
    this._deleteExercisesById(id).subscribe((success: any) => {
      this.logger.log("delete exercises By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("delete exercises By Id error: ", error)
    })
  }

  public getExerciseListOnSameCategory(id: string) {
    this.exerciseSchedule = this.exerciseSchedule.filter(ex => ex.category == id)
  }
}
