import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { API } from './../../_helpers/api.config';
const packUrl = API + "fin/package/";

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService
  ) { }

  private _getPackagesList() {
    return this.httpClient.get(packUrl + "list")
  }
  private _createPackage(data: any) {
    return this.httpClient.post(packUrl + "create", data);
  }
  private _getPackageById(id: string) {
    return this.httpClient.get(packUrl + "id/" + id);
  }
  private _getPackageByCoachId(id: string) {
    return this.httpClient.get(packUrl + "owner/id/" + id);
  }
  private _deletePackageById(id: string) {
    return this.httpClient.delete(packUrl + "accounts/id/" + id);
  }


  public getPackagesList() {
    this._getPackagesList().subscribe((success: any) => {
      this.logger.log("get packages List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get packages List error: ", error)
    })
  }

  public createPackage(data: any) {
    this._createPackage(data).subscribe((success: any) => {
      this.logger.log("create Package:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("create Package error: ", error)
    })
  }
  public getPackageById(id: string) {
    this._getPackageById(id).subscribe((success: any) => {
      this.logger.log("get package By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get package By Id error: ", error)
    })
  }
  public getPackageByCoachId(id: string) {
    this._getPackageByCoachId(id).subscribe((success: any) => {
      this.logger.log("get package By coache Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get package By coache Id error: ", error)
    })
  }
  public deletePackageById(id: string) {
    this._deletePackageById(id).subscribe((success: any) => {
      this.logger.log("delete Package By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("delete Package By Id error: ", error)
    })
  }
}
