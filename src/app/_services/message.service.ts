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
    private dialog: DialogService,
    private toast: ToastService,
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
  successMessage(resMessage: string): string {
    let message: string = '';
    this.translate.get('SUCCESS.' + resMessage).subscribe(resMsg => {
      message = resMsg
    })
    return message;
  }
  errors(res: HttpErrorResponse, type: string = '', altType: string = '', altMessage: string = '') {
    this.logger.log('resMessages: ', res)
    let resKeys = Object.keys(res.error);
    let messages: any = [];
    this.logger.log('resKeys: ', resKeys)
    this.logger.log('messages: ', messages)
    if (resKeys.length > 0) {
      resKeys.forEach((e: any) => {
        if (Array.isArray(res.error[e])) {
          res.error[e].forEach((e2: any) => { this.getTranslate(e2, type, altType, altMessage).then(msg => messages.push(msg)) })
        }
        else {
          this.getTranslate(res.error[e], type, altType, altMessage).then(msg => messages.push(msg))
        }

      });

      if (messages.length == 1)
        this.toast.error(messages[0])
      else {
        // this.dialog.errorLog(messages)
      }
    }
    setTimeout(() => {

      this.logger.log('resMessages: ', res)
      this.logger.log('resKeys: ', resKeys)
      this.logger.log('messages: ', messages)
    }, 1000)

    return throwError('error')
  }


  private getTranslate(value: string, type: string = '', altType: string = '', altMessage: string = '') {
    let _message = '';

    this.translate.get(`ERROR.${type}.${value}`).toPromise().then(msg => {
      if (msg.includes(`ERROR.${type}.${value}`)) {
        this.translate.get(`ERROR.${altType}.${value}`).toPromise().then(altType => {
          if (altType.includes(`ERROR.${altType}.${value}`)) {
            this.translate.get(`ERROR.${type}.${altMessage}`).toPromise().then(altMsg => {
              if (altType.includes(`ERROR.${type}.${altMessage}`)) {
                this.translate.get('ERROR.error').toPromise().then(er => _message = (`${er} - ${value}`))
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
      }, 1000)
    })
  }
}
