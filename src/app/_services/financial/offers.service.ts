import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { API } from './../../_helpers/api.config';
import { MessageService } from './../message.service';
import { FormAlertService } from './../form-alert.service';
import { ToastService } from './../toast.service';
import { FormGroup } from '@angular/forms';
import { MessageRespones } from 'src/app/_common/types';
const offersUrl = API + "fin/offer/";
@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService,
    private messageSrv: MessageService,
    private formAlert: FormAlertService,
    private toastSrv: ToastService
  ) { }

  public _getOfferByPackageId(id: string) {
    return this.httpClient.get(offersUrl + "id/" + id + '')
  }
  private _updateOfferByPackageId(data: any, id: string) {
    return this.httpClient.patch(offersUrl + "id/" + id, data)
  }
  private _createOffer(data: any) {
    return this.httpClient.post(offersUrl + "create", data);
  }
  private _deleteOfferByPackageId(id: string) {
    return this.httpClient.delete(offersUrl + "accounts/id/" + id);
  }


  public getOfferByPackageId(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._getOfferByPackageId(id).subscribe((success: any) => {
        this.logger.log("get offer by id:", success)
        resolve({ status: 'Success', message: 'Compelet', method: 'getOfferByPackageId' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, undefined, false).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'getOfferByPackageId' }))
        this.logger.error("get offer by id error: ", error)
      })
    })

  }
  public ___getOfferByPackageId(id: string) {
    return this._getOfferByPackageId(id);
  }
  public updateOfferByPackageId(data: any, id: string, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._updateOfferByPackageId(data, id).subscribe((success: any) => {
        this.logger.log("get Bank List:", success)
        resolve({ status: "Success", message: 'Compelet', method: 'updateOfferByPackageId' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, form).then(msgs => rejects({ status: "Failed", message: msgs, method: 'updateOfferByPackageId' }))
        this.logger.error("get Bank List error: ", error)
      })
    })
  }
  public createOffer(data: any, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._createOffer(data).subscribe((success: any) => {
        this.logger.log("create offer:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'createOffer' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, form).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'createOffer' }))
        this.logger.error("create offer error: ", error)
      })
    })
  }

  public deleteOfferPByackageId(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this._deleteOfferByPackageId(id).subscribe((success: any) => {
        this.logger.log("delete Bank Account By Id:", success)
        resolve({ status: 'Success', message: 'Complete', method: 'deleteOfferPByackageId' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error).then(msgs => rejects({ status: 'Failed', message: msgs, method: 'deleteOfferPByackageId' }))
        this.logger.error("delete Bank Account By Id error: ", error)
      })
    })
  }
  private errorMsg(error: HttpErrorResponse, form?: FormGroup, useAlert = false) {
    return new Promise((resolse, rej) => {

      this.messageSrv.errors(error, 'OFFER.', 'GENRAL.', '', false).then(res => {
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
