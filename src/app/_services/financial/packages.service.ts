import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageRespones } from 'src/app/_common/types';
import { FormAlertService } from '../form-alert.service';
import { LoggerService } from '../logger.service';
import { MessageService } from '../message.service';
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
    private toastSrv: ToastService,
    private datePipe: DatePipe,
    private formAlert: FormAlertService,
    private messageSrv: MessageService

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
    return new Promise<MessageRespones>((resolve, rejects) => {
      this.isLoading = true;
      this.hasError = false
      this._getPackagesList().subscribe((success: any) => {
        this.packages = success;
        this.loaded()
        this.logger.log("get packages List:", success)
        resolve({ status: 'Success', message: 'compelet', method: 'getPackagesList' })
      }, (error: HttpErrorResponse) => {
        this.hasError = true
        this.errorMsg(error, undefined, false).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getPackagesList' }))
        this.logger.error("get packages List error: ", error)
      })
    })
  }
  public __getPackagesList() {
    return this._getPackagesList().toPromise();
  }
  public getAllAttachmentList() {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._getAllAttachmentList().subscribe((success: any) => {
        this.attachmentList = success;
        this.logger.log("get attach List:", success)
        resolve({ status: 'Success', message: 'compelet', method: 'getAllAttachmentList' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, undefined, false).then(msgs =>
          rejects({ status: 'Failed', message: msgs, method: 'getAllAttachmentList' }))
        this.logger.error("get attach List error: ", error)
      })
    })
  }

  public createPackage(data: any, formPack: FormGroup, offer?: any, formOffer?: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {
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
        if (offer && formOffer) {
          offer.package_id = success.external_id;
          offer.start_date = this.datePipe.transform(offer.start_date, 'yyyy-MM-dd');
          offer.end_date = this.datePipe.transform(offer.end_date, 'yyyy-MM-dd');
          this.offerSrv.createOffer(offer, formOffer)
        }
        this.getPackagesList();
        this.messageSrv.successMessage('PACKAGES.new').then(msg => this.toastSrv.success(msg))
        this.logger.log("create Package:", success)
        resolve({ status: 'Success', message: 'message', method: 'createPackage' })
      }, (error: HttpErrorResponse) => {
        // this.hasError = true;
        this.errorMsg(error, formPack)
          .then(msgs => rejects({ status: 'Failed', message: msgs, method: 'createPackage' }))
        this.logger.error("create Package error: ", error)
      })
    })
  }
  public getPackageById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._getPackageById(id).subscribe((success: any) => {
        this.package = success;
        this.logger.log("get package By Id:", success);
        resolve({ status: 'Success', message: 'Complete', method: 'getPackageById' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, undefined, false)
        this.logger.error("get package By Id error: ", error)
      })
    })
  }
  public getPackageByCoachId(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._getPackageByCoachId(id).subscribe((success: any) => {
        this.packages = success;
        this.logger.log("get package By coache Id:", success);
        resolve({ status: 'Success', message: 'Compelete', method: 'getPackageByCoachId' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, undefined, false).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getPackageByCoachId' }))
        this.logger.error("get package By coache Id error: ", error)
      })
    })
  }
  public updatePackageById(data: any, id: string, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this.isLoading = true
      this.hasError = false
      this._updatePackageById(data, id).subscribe((success: any) => {
        this.getPackagesList()
        this.logger.log("update Package:", success)
        this.messageSrv.successMessage('PACKAGES.update').then(msg => this.toastSrv.success(msg))
        this.loaded();
        resolve({ status: 'Success', message: 'Compelete', method: 'updatePackageById' })
      }, (error: HttpErrorResponse) => {
        // this.hasError = true
        this.logger.error("update Package error: ", error)
        this.errorMsg(error, form).then(msgs => rejects({ status: 'Success', message: msgs, mothed: "updatePackageById" }))
      })
    })

  }
  public deletePackageById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this.isLoading = true
      this.hasError = false
      this._deletePackageById(id).subscribe((success: any) => {
        this.getPackagesList()
        this.logger.log("delete Package By Id:", success)
        this.messageSrv.successMessage('PACKAGES.delete').then(msg => this.toastSrv.success(msg))
        resolve({ status: 'Success', message: 'Complete', method: 'deletePackageById' })
      }, (error: HttpErrorResponse) => {
        this.hasError = true
        this.errorMsg(error, undefined, true).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'deletePackageById' }));
      })
    })
  }
  public getPackagesListForLandingpage() {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._getPackagesListForLandingpage().subscribe((success: any) => {
        this.packages = success;
        this.logger.log('get Packages List For Landingpage: ', success)
        resolve({ status: 'Success', message: 'Complete', method: 'getPackagesListForLandingpage' })
      }, (error: HttpErrorResponse) => {
        this.logger.error('error get Packages List For Landingpage: ', error);
        this.errorMsg(error, undefined, false).then(msgs => resolve({ status: 'Failed', message: msgs, method: "getPackagesListForLandingpage" }))
      })
    })
  }
  loaded() {
    setTimeout(() => { this.isLoading = false }, 500)
  }


  private errorMsg(error: HttpErrorResponse, form?: FormGroup, useAlert = false) {
    return new Promise((resolse, rej) => {

      this.messageSrv.errors(error, 'PACKAGES.', 'GENRAL.', '', false).then(res => {
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
