import { Injectable } from '@angular/core';
import * as _moment from 'moment-hijri'
import * as moment from 'moment'
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerComponent } from '../view/components/datepicker/datepicker.component';
@Injectable({
  providedIn: 'root'
})
export class DatepickerService {

  newDate: any;
  moment_hijri = _moment();
  isValueChange = false;
  constructor(
    private dialog: MatDialog
  ) { }
  toHjriDate(date: any) {
    let convert = _moment(date);
    return { year: convert.iYear(), month: (convert.iMonth() + 1), day: convert.iDate() }
  }
  toHjriDateUTC(date: any) {
    let convert: any = _moment(date);
    return convert = moment.utc(convert).toISOString();
  }
  normalForm(date: any) {
    let convert = moment(date);
    return { year: convert.year(), month: (convert.month() + 1), day: convert.date() };

  }
  fromNgBootStrap(date: any) {
    let convert = moment(date.year + '/' + date.month + '/' + date.day, 'YYYY/MM/DD').format('YYYY/MM/DD');
    return convert;
  }
  fromHijri(date: any) {
    let convert = _moment(date.year + '/' + date.month + '/' + date.day, 'iYYYY/iMM/iDD').format('YYYY/MM/DD');
    return convert;
  }
  fromHijriUTC(date: any) {
    let convert = _moment(date.year + '/' + date.month + '/' + date.day, 'iYYYY/iMM/iDD').format('YYYY/MM/DD');
    return convert = moment.utc(convert).toISOString();
  }
  fromNgBootStrapUTC(date: any) {
    let convert = moment(date.year + '/' + date.month + '/' + date.day, 'YYYY/MM/DD').format('YYYY/MM/DD');
    return convert = moment.utc(convert).toString();
  }
  dateInput(title: string, currentDate?: any, minDate?: any, maxDate?: any,) {
    let dialgoRef = this.dialog.open(DatepickerComponent, {
      width: "auto",
      minWidth: "300px",
      maxWidth: "90%",
      height: "auto",
      maxHeight: "90%",
      data: {
        title: title,
        date: currentDate,
        minDate: minDate,
        maxDate: maxDate,
      }
    })
    return dialgoRef.afterClosed();
  }
  dateToString() {
    return this.newDate.year + "/" + this.newDate.month + "/" + this.newDate.day;
  }
  toString(date: any, space?: string) {
    space = space ? space : '/';
    return date.year + space + date.month + space + date.day;
  }
  gergorianToString(date: any, space?: string) {
    return this.replaceNumber(_moment(date, 'iYYYY/iMM/iDD').format(`YYYY${space}MM${space}DD`))
  }
  hijriToString(date: any, space?: string) {
    return this.replaceNumber(_moment(date, 'YYYY/MM/DD').format(`iYYYY${space}iMM${space}iDD`))
  }
  dateObj(date: string) {
    let _d: any[] = date.split('/');
    return { year: +(_d[0]), month: +(_d[1]), day: +(_d[2]) }
  }
  getTodayDateHijri() {
    return this.replaceNumber(_moment().format('iYYYY/iMM/iDD'))
  }
  getTodayDate() {
    return this.replaceNumber(moment().format('YYYY/M/DD'));
  }
  isDateHijri(date: string) {
    return +(date.split('/')[0]) < 1700;
  }
  replaceNumber(str: string) {
    return str
      .replace(/٠/g, '0')
      .replace(/١/g, '1')
      .replace(/٢/g, '2')
      .replace(/٣/g, '3')
      .replace(/٤/g, '4')
      .replace(/٥/g, '5')
      .replace(/٦/g, '6')
      .replace(/٧/g, '7')
      .replace(/٨/g, '8')
      .replace(/٩/g, '9')
  }

}

