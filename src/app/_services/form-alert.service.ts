import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class FormAlertService {

  constructor(
    private logger: LoggerService
  ) { }

  setErrors(form: FormGroup, keySet: string[], errors: any[]): { controlErrors: any, notKey: any } {
    let errorObj: any = {};
    let notKey: any = {};
    this.logger.log('formGroup alert: ', form)
    if (keySet.length < 50)
      keySet.forEach((control, i) => {
        let errorList = ''

        if (Array.isArray(errors[i])) {
          errors[i].forEach((msg: any) => {
            errorList += msg + '\n';
          });
        } else {
          errorList = errors[i];
        }
        if (form.controls[control]) {
          errorObj[control] = errorList
          form.controls[control].setErrors({ resError: errorList })
        }
        else
          notKey[control] = errorList
      });

    return { controlErrors: errorObj, notKey: notKey };
  }

  clearControls(form: FormGroup) {
    this.logger.log('clearControls: ', form.controls)
    let keySet: any[] = Object.keys(form.controls);
    keySet.forEach(control => {
      form.controls[control].setErrors({ resError: null });
    });
  }
}
