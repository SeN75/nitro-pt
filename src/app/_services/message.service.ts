import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from './dialog.service';
import { ToastService } from './toast.service';
import { LoggerService } from './logger.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private translate: TranslateService,
    private logger: LoggerService
  ) { }
  errorMessage(resMessage: string, altrMessage: string, key: string): string {
    let message: string = ''
    this.translate.get('ERROR.' + resMessage).subscribe(resMsg => {
      let msg: string = resMsg;
      console.log(msg)
      if (msg.includes('ERROR'))
        this.translate.get('ERROR.' + altrMessage).subscribe(altMsg => message = altMsg);
      else if (resMessage.includes('you are not authorised'))
        message = resMsg + ' - ' + key;
      else
        message = msg
    })
    return message;
  }
  successMessage(resMessage: string): Promise<string> {
    let message: string = '';
    return new Promise<string>((res, rej) => {

      this.translate.get('SUCCESS.' + resMessage).subscribe(resMsg => {
        message = resMsg
      })
      res(message);
    })
  }
  errors(res: HttpErrorResponse, type: string = '', altType: string = '', altMessage: string = '', useAlert = true): Promise<any> {
    this.logger.log('resMessages: ', res)
    let resKeys = Object.keys(res.error);
    let messages: any = [];
    this.logger.log('resKeys: ', resKeys)
    this.logger.log('messages: ', messages)
    if (resKeys.length > 0) {
      resKeys.forEach((e: any) => {
        if (Array.isArray(res.error[e])) {
          let arr: any = [];
          res.error[e].forEach((e2: any) => { this.getTranslate(e2, type, altType, altMessage).then(msg => arr.push(msg)) })
          messages.push(arr)
        }
        else {
          this.getTranslate(res.error[e], type, altType, altMessage).then(msg => messages.push(msg))
        }
      });
      // setTimeout(() => {
      //   if (messages.length == 1)
      //     this.toast.error(messages[0])
      //   else if (useAlert) {
      //     this.dialog.anErrorOccurred(messages)

      //   }
      // }, 500)
    }
    setTimeout(() => {

      this.logger.log('resMessages: ', res)
      this.logger.log('resKeys: ', resKeys)
      this.logger.log('messages: ', messages)
    }, 500)
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({ keySet: resKeys, errors: messages })
      }, 500)
    })
  }


  private getTranslate(value: string, type: string = '', alterType: string = '', altMessage: string = '') {
    let _message = '';

    this.translate.get(`ERROR.${type}${value}`).toPromise().then(msg => {

      if (msg.includes(`ERROR.${type}${value}`)) {
        this.translate.get(`ERROR.${alterType}${value}`).toPromise().then(altType => {

          if (altType.includes(`ERROR.${alterType}${value}`)) {
            this.translate.get(`ERROR.${type}${altMessage}`).toPromise().then(altMsg => {

              if (altMsg.includes(`ERROR.${type}${altMessage}`)) {
                _message = value;
              }
              else {
                _message = (altMsg)
              }
            })
          } else {
            _message = (altType)
          }
        })
      } else {
        _message = (msg)
      }
    })
    return new Promise((res, rej) => {
      setTimeout(() => {

        res(_message)
      }, 500)
    })
  }
}
