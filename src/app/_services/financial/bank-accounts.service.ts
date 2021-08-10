import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { API } from './../../_helpers/api.config';
const bankUrl = API + "fin/bank/";
@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {

  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private logger: LoggerService
  ) { }

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
  private _deleteBankAccountById(id: string) {
    return this.httpClient.delete(bankUrl + "accounts/id/" + id);
  }


  public getBankAccountsList() {
    this._getBankAccountsList().subscribe((success: any) => {
      this.logger.log("get Bank Accounts List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get Bank Accounts List error: ", error)
    })
  }
  public getBankList() {
    this._getBankList().subscribe((success: any) => {
      this.logger.log("get Bank List:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get Bank List error: ", error)
    })
  }
  public createBankAccount(data: any) {
    this._createBankAccount(data).subscribe((success: any) => {
      this.logger.log("create Bank Account:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("create Bank Account error: ", error)
    })
  }
  public getBankAccountById(id: string) {
    this._getBankAccountById(id).subscribe((success: any) => {
      this.logger.log("get Bank Account By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get Bank Account By Id error: ", error)
    })
  }
  public deleteBankAccountById(id: string) {
    this._deleteBankAccountById(id).subscribe((success: any) => {
      this.logger.log("delete Bank Account By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("delete Bank Account By Id error: ", error)
    })
  }
}
