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
export class FoodUnitsService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService
  ) { }
  private _getFoodUnitsList() {
    return this.httpClient.get(foodUrl + "list")
  }
  private _getFoodUnitsById(id: string) {
    return this.httpClient.get(foodUrl + "id/" + id);
  }

  private _createFoodUnits(data: any) {

    return this.httpClient.post(foodUrl + "create", data);
  }
  private _updateFoodUnitsById(data: any, id: string) {
    return this.httpClient.patch(foodUrl + "id/" + id, data);
  }
  private _deleteFoodUnitsById(id: string) {
    return this.httpClient.delete(foodUrl + "id/" + id);
  }

  public getFoodUnitsList() {
    this._getFoodUnitsList().subscribe((success: any) => {
      this.logger.log("get food units List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get food units List error: ", error)
    })
  }
  public getFoodUnitsById(id: string) {
    this._getFoodUnitsById(id).subscribe((success: any) => {
      this.logger.log("get food units by  id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get food units by  id error: ", error)
    })
  }


  public createFoodUnits(data: any) {
    this._createFoodUnits(data).subscribe((success: any) => {
      this.logger.log("create food units:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("create food units error: ", error)
    })
  }
  public updateFoodUnitsById(data: any, id: string) {
    this._updateFoodUnitsById(data, id).subscribe((success: any) => {
      this.logger.log("update food units By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("update food units By Id error: ", error)
    })
  }
  public deleteFoodUnitsById(id: string) {
    this._deleteFoodUnitsById(id).subscribe((success: any) => {
      this.logger.log("delete Food units By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("delete Food units By Id error: ", error)
    })
  }
}

