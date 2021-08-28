import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { API } from './../../_helpers/api.config';
const offersUrl = API + "fin/offer/";
@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService
  ) { }

  public _getOfferByPackageId(id: string) {
    return this.httpClient.get(offersUrl + id + '')
  }
  private _updateOfferByPackageId(data: any, id: string) {
    return this.httpClient.patch(offersUrl, data)
  }
  private _createOffer(data: any) {
    return this.httpClient.post(offersUrl + "create", data);
  }
  private _deleteOfferByPackageId(id: string) {
    return this.httpClient.delete(offersUrl + "accounts/id/" + id);
  }


  public getOfferByPackageId(id: string) {
    this._getOfferByPackageId(id).subscribe((success: any) => {
      this.logger.log("get offer by id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get offer by id error: ", error)
    })
  }
  public updateOfferByPackageId(data: any, id: string) {
    this._updateOfferByPackageId(data, id).subscribe((success: any) => {
      this.logger.log("get Bank List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get Bank List error: ", error)
    })
  }
  public createOffer(data: any) {
    this._createOffer(data).subscribe((success: any) => {
      this.logger.log("create offer:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("create offer error: ", error)
    })
  }

  public deleteOfferPByackageId(id: string) {
    this._deleteOfferByPackageId(id).subscribe((success: any) => {
      this.logger.log("delete Bank Account By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("delete Bank Account By Id error: ", error)
    })
  }
}
