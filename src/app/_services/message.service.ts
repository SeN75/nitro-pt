import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private translate: TranslateService
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
}
