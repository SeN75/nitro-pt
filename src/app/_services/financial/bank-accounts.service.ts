import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormAlertService } from '../form-alert.service';
import { LoggerService } from '../logger.service';
import { MessageService } from '../message.service';
import { ToastService } from '../toast.service';
import { API } from './../../_helpers/api.config';
import { MessageRespones } from './../../_common/types';
const bankUrl = API + "fin/bank/";
@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {
  banksAccounts: any[] = [];
  banksList: any[] = [];

  isLoading = true;
  hasError = false;
  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService,
    private messageSrv: MessageService,
    private toastSrv: ToastService,
    private formAlert: FormAlertService
  ) {
    this.getBankAccountsList();
    this.getBankList();
  }

  private _getBankAccountsList() {
    return this.httpClient.get(bankUrl + "accounts/list")
  }
  private _getBankList() {
    return this.httpClient.get(bankUrl + "list")
  }
  private _createBankAccount(data: any) {
    return this.httpClient.post(bankUrl + "accounts/create", data);
  }
  private _getBankAccountById(id: string) {
    return this.httpClient.get(bankUrl + "accounts/id/" + id);
  }
  private _updateBankAccountById(data: any, id: string) {
    return this.httpClient.patch(bankUrl + "accounts/id/" + id, data);
  }
  private _deleteBankAccountById(id: string) {
    return this.httpClient.delete(bankUrl + "accounts/id/" + id);
  }


  public getBankAccountsList() {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this.isLoading = true;
      this.hasError = false;
      this._getBankAccountsList().subscribe((success: any) => {
        this.banksAccounts = success;
        setTimeout(() => this.isLoading = false, 500)

        this.logger.log("get Bank Accounts List:", success)
        resolve({ status: 'Success', message: 'complete', method: 'getBankAccountsList' })
      }, (error: HttpErrorResponse) => {
        this.hasError = true
        this.errorMsg(error, undefined, true).then(msgs =>
          rejects({ status: 'Failed', message: msgs, method: 'getBankAccountsList' })
        )
        this.logger.error("get Bank Accounts List error: ", error)
      })
    })
  }
  public getBankList() {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this.isLoading = true;
      this.hasError = false;
      this._getBankList().subscribe((success: any) => {
        this.banksList = success;
        setTimeout(() => this.isLoading = false, 500)
        this.logger.log("get Bank List:", success)
        resolve({ status: 'Success', message: 'complete', method: 'getBankList' })
      }, (error: HttpErrorResponse) => {
        this.hasError = true
        this.logger.error("get Bank List error: ", error)
        this.errorMsg(error, undefined, true).then(msgs =>
          rejects({ status: 'Failed', message: msgs, method: 'getBankList' })
        )
      })
    })
  }
  public createBankAccount(data: any, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this.getBankAccountsList();
      this._createBankAccount(data).subscribe((success: any) => {
        this.logger.log("create Bank Account:", success)
        this.messageSrv.successMessage('SETTINGS.new-bankaccount').then(msg => this.toastSrv.success(msg));
        resolve({ status: 'Success', message: 'complete', method: 'createBankAccount' })
      }, (error: HttpErrorResponse) => {

        this.errorMsg(error, form);
        rejects({ status: 'Failed', message: 'error', method: 'createBankAccount' })
        this.logger.error("create Bank Account error: ", error)
      })
    })
  }
  public getBankAccountById(id: string) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._getBankAccountById(id).subscribe((success: any) => {
        this.logger.log("get Bank Account By Id:", success)
        resolve({ status: 'Success', message: 'complete', method: 'getBankAccountById' })

      }, (error: HttpErrorResponse) => {
        this.logger.error("get Bank Account By Id error: ", error)
        this.errorMsg(error, undefined, true)
        rejects({ status: 'Failed', message: 'error', method: 'getBankAccountById' })

      })
    })
  }
  public updateBankAccountById(data: any, id: string, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._updateBankAccountById(data, id).subscribe((success: any) => {
        this.messageSrv.successMessage('SETTINGS.update-bankaccount').then(msg => this.toastSrv.success(msg));
        this.getBankAccountsList();
        this.logger.log("update Bank Account By Id:", success);
        resolve({ status: 'Success', message: 'complete', method: 'updateBankAccountById' })

      }, (error: HttpErrorResponse) => {

        this.errorMsg(error, form)
        this.logger.error("update Bank Account By Id error: ", error)
        rejects({ status: 'Failed', message: 'error', method: 'updateBankAccountById' })
      })
    })
  }
  public deleteBankAccountById(id: string) {
    this._deleteBankAccountById(id).subscribe((success: any) => {
      this.messageSrv.successMessage('SETTINGS.delete-bankaccount').then(msg => this.toastSrv.success(msg));
      this.getBankAccountsList();
      this.logger.log("delete Bank Account By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("delete Bank Account By Id error: ", error)
    })
  }
  private errorMsg(error: HttpErrorResponse, form?: FormGroup, useAlert = false) {
    return new Promise((resolse, rej) => {

      this.messageSrv.errors(error, 'REGISTRATION.', 'GENRAL.', '', false).then(res => {
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
