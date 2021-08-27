import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
import { API } from './../../_helpers/api.config';
import { OffersService } from './offers.service';
const packUrl = API + "fin/package/";

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  packages: any = [];
  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService,
    private offerSrv: OffersService,
    private toaterSrv: ToastService,
    private datePipe: DatePipe,

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
  private _updatePackageById(data: any, id: string) {
    return this.httpClient.patch(packUrl + "id/" + id, data);
  }
  private _deletePackageById(id: string) {
    return this.httpClient.delete(packUrl + "id/" + id);
  }


  public getPackagesList() {
    this._getPackagesList().subscribe((success: any) => {
      this.packages = success;
      this.logger.log("get packages List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get packages List error: ", error)
    })
  }

  public createPackage(data: any, offer?: any) {
    this._createPackage(data).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.PACKAGES.new').subscribe(msg => this.toaterSrv.success(msg))
      if (offer) {
        offer.package_id = success.external_id;
        offer.start_date = this.datePipe.transform(offer.start_date, 'yyyy-MM-dd');
        offer.end_date = this.datePipe.transform(offer.end_date, 'yyyy-MM-dd');
        this.offerSrv.createOffer(offer)
      }
      this.getPackagesList()
      this.logger.log("create Package:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.PACKAGES.new').subscribe(msg => this.toaterSrv.error(msg))

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
  public updatePackageById(data: any, id: string) {
    this._updatePackageById(data, id).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.PACKAGES.update').subscribe(msg => this.toaterSrv.success(msg))
      this.getPackagesList()
      this.logger.log("update Package:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.PACKAGES.update').subscribe(msg => this.toaterSrv.error(msg))

      this.logger.error("update Package error: ", error)
    })
  }
  public deletePackageById(id: string) {
    this._deletePackageById(id).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.PACKAGES.delete').subscribe(msg => this.toaterSrv.success(msg))
      this.getPackagesList()
      this.logger.log("delete Package By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.PACKAGES.delete').subscribe(msg => this.toaterSrv.error(msg))

      this.logger.error("delete Package By Id error: ", error)
    })
  }
}
