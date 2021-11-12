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
  isLoading = true;
  hasError = false;

  packages: any[] = [];
  attachmentList: any = [];

  package: any = {
    required_attachments: [],
    attach_required: false
  }
  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService,
    private offerSrv: OffersService,
    private toaterSrv: ToastService,
    private datePipe: DatePipe,

  ) {
    this.getAllAttachmentList();
  }
  private _getPackagesList() {
    return this.httpClient.get(packUrl + "list");
  }
  private _createPackage(data: any) {
    return this.httpClient.post(packUrl + "create", data);
  }
  private _getAllAttachmentList() {
    return this.httpClient.get(API + 'fin/attachments/list');
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
  private _getPackagesListForLandingpage() {
    return this.httpClient.get(packUrl + 'landing/owner/150a73ff-6e0d-4c8d-94a2-2aae9602147c');
  }

  public getPackagesList() {
    this.isLoading = true;
    this.hasError = false
    this._getPackagesList().subscribe((success: any) => {
      this.packages = success;
      this.loaded()
      this.logger.log("get packages List:", success)
    }, (error: HttpErrorResponse) => {
      this.hasError = true
      this.logger.error("get packages List error: ", error)
    })
  }
  public __getPackagesList() {
    return this._getPackagesList().toPromise();
  }
  public getAllAttachmentList() {
    this._getAllAttachmentList().subscribe((success: any) => {
      this.attachmentList = success;
      this.logger.log("get attach List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get attach List error: ", error)
    })
  }

  public createPackage(data: any, offer?: any) {
    this.logger.log('dd: ', data)
    this.isLoading = true
    this.hasError = false
    this._createPackage({
      attach_required: data.attach_required,
      description: data.description,
      description_ar: data.description_ar,
      iban_id: data.iban_id,
      name: data.name,
      name_ar: data.name_ar,
      period: data.period,
      price: data.price,
      attachment_id: data.attachment_id
    }).subscribe((success: any) => {
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
      this.hasError = true
      this.logger.error("create Package error: ", error)
    })
  }
  public getPackageById(id: string) {
    this._getPackageById(id).subscribe((success: any) => {
      this.package = success;
      this.logger.log("get package By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get package By Id error: ", error)
    })
  }
  public getPackageByCoachId(id: string) {
    this._getPackageByCoachId(id).subscribe((success: any) => {
      this.packages = success;
      this.logger.log("get package By coache Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get package By coache Id error: ", error)
    })
  }
  public updatePackageById(data: any, id: string) {
    this.isLoading = true
    this.hasError = false
    this._updatePackageById(data, id).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.PACKAGES.update').subscribe(msg => this.toaterSrv.success(msg))
      this.getPackagesList()
      this.logger.log("update Package:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.PACKAGES.update').subscribe(msg => this.toaterSrv.error(msg))
      this.hasError = true
      this.logger.error("update Package error: ", error)
    })
  }
  public deletePackageById(id: string) {
    this.isLoading = true
    this.hasError = false
    this._deletePackageById(id).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.PACKAGES.delete').subscribe(msg => this.toaterSrv.success(msg))
      this.getPackagesList()
      this.logger.log("delete Package By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.PACKAGES.delete').subscribe(msg => this.toaterSrv.error(msg))
      this.hasError = true
      this.logger.error("delete Package By Id error: ", error)
    })
  }
  public getPackagesListForLandingpage() {
    this._getPackagesListForLandingpage().subscribe((success: any) => {
      this.packages = success;
      this.logger.log('get Packages List For Landingpage: ', success)
    }, (error: HttpErrorResponse) => {
      this.logger.error('error get Packages List For Landingpage: ', error)
    })
  }
  loaded() {
    setTimeout(() => { this.isLoading = false }, 500)
  }
}
