import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from './dialog.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private translate: TranslateService,
    private dialog: DialogService,
    private toast: ToastService
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
  errors(res: any, type: string = '') {
    let resKeys = Object.keys(res);
    let messages = [];
    if (resKeys.length > 0)
      resKeys.forEach(e => {
        this.translate.get(`ERROR.${type}`)
      })
  }
}
