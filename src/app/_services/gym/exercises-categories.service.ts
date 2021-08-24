import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { API } from 'src/app/_helpers/api.config';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
const gymUrl = API + "gym/exercise/categories/";

@Injectable({
  providedIn: 'root'
})
export class ExercisesCategoriesService {
  categories: any;
  workout: any;
  exerciseCategory: any;
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private logger: LoggerService) { }


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
    this._getExerciseCategoriesList().subscribe((success: any) => {
      this.categories = success;
      this.logger.log("get Exercise List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get Exercise List error: ", error)
    })
  }

  public getExercisetCategoriesById(id: string) {
    this._getExercisetCategoriesById(id).subscribe((success: any) => {
      this.exerciseCategory = success;
      this.logger.log("get exercise by id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get exercise by id error: ", error)
    })
  }

  public createExercisesCategory(data: any) {
    this._createExercisesCategory(data).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.WORKOUT.new-category').subscribe(msg => this.toastSrv.success(msg))
      this.getExerciseCategoriesList();
      this.logger.log("create exercises:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.WORKOUT.new-category').subscribe(msg => this.toastSrv.error(msg))

      this.logger.error("create exercises error: ", error)
    })
  }
  public updateExercisesCategoryById(data: any, id: string) {
    this._updateExercisesCategoryById(data, id).subscribe((success: any) => {
      this.getExerciseCategoriesList()
      this.translateSrv.get('SUCCESS.WORKOUT.update-category').subscribe(msg => this.toastSrv.success(msg))
      this.logger.log("update exercises By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.WORKOUT.update-category').subscribe(msg => this.toastSrv.error(msg))
      this.logger.error("update exercises By Id error: ", error)
    })
  }
  public deleteExerciseCategoryById(id: string) {
    this._deleteExerciseCategoryById(id).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.WORKOUT.delete-category').subscribe(msg => this.toastSrv.success(msg))
      this.getExerciseCategoriesList()
      this.logger.log("delete exercises By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.WORKOUT.delete-category').subscribe(msg => this.toastSrv.error(msg))

      this.logger.error("delete exercises By Id error: ", error)
    })
  }
}
