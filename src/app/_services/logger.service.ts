import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(message: string, value?: any) {
    if (!environment.production) {
      if (value) console.log(message, value)
      else console.log(message)
    }
  }
  error(message: string, value?: any) {
    if (!environment.production) {
      if (value) console.error(message, value)
      else console.error(message)
    }
  }
}
