import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbCalendar, NgbCalendarIslamicCivil, NgbDate, NgbDatepickerConfig, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import * as _moment from 'moment-hijri';
import { IslamicI18n } from 'src/app/_helpers/hijri-date';
import { DatepickerService } from 'src/app/_services/datepicker.service';
import { LoggerService } from 'src/app/_services/logger.service';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  // providers: [
  //   { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
  //   { provide: NgbDatepickerI18n, useClass: IslamicI18n }
  // ]
})
export class DatepickerComponent implements OnInit {
  toDayDate: any;
  maxDate: any;
  minDate: any;
  isHijri = false;
  constructor(
    public dialogRef: MatDialogRef<DatepickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate: TranslateService,
    private calendar: NgbCalendar,
    public config: NgbDatepickerConfig,
    private dateSrv: DatepickerService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.logger.log('current date initial: ', this.data.date + "")
    if (this.data.date === undefined || this.data.date == '') {
      this.toDayDate = this.calendar.getToday();
      this.dateSrv.newDate = {};
    } else {
      this.toDayDate = this.dateSrv.dateObj(this.data.date);
      this.dateSrv.newDate = this.toDayDate;
      this.isHijri = this.toDayDate.year < 1700;
      this.logger.log('current date: ', this.toDayDate)

    }
    this.logger.log('current date: ', this.toDayDate)
    this.assmbaleData();
  }
  assmbaleData() {
    this.logger.log('this.isHijri: ', this.isHijri)
    if (this.data.maxDate === 'lessThanToDay') {
      let maxDate: any = new Date();
      maxDate.setDate(maxDate.getDate() - 1);
      maxDate = this.isHijri ? _moment(maxDate).format('YYYY/M/DD') : moment(maxDate).format('YYYY/M/D');;
      this.maxDate = this.isHijri ? this.dateSrv.toHjriDate(maxDate) : this.dateSrv.normalForm(maxDate);
      this.config.maxDate = this.maxDate;
      this.config.markDisabled = (date: any) => date.before(this.toDayDate) <= this.maxDate;

    } else {
      this.config.maxDate = this.isHijri ? { year: 2000, month: 12, day: 30 } : { year: 2500, month: 12, day: 29 }
    }
    if (this.data.minDate === 'moreThanToDay') {

      let minDate: any = new Date();
      minDate.setDate(minDate.getDate() + 1);
      minDate = this.isHijri ? _moment(minDate).format('YYYY/M/DD') : moment(minDate).format('YYYY/M/D');
      this.minDate = this.isHijri ? this.dateSrv.toHjriDate(minDate) : this.dateSrv.normalForm(minDate);
      this.config.minDate = this.minDate;
      this.config.markDisabled = (date: any) => date.after(this.toDayDate) >= this.minDate;
    }
    else if (this.data.minDate === 'fromToDay' || this.data.maxDate === 'fromToDay') {
      this.config.minDate = this.toDayDate;
      this.config.markDisabled = (date: any) => date.after(this.toDayDate) >= this.toDayDate;

    }
    else {
      this.minDate = this.isHijri ? { year: 1300, month: 1, day: 1 } : { year: 1700, month: 1, day: 1 }
      this.config.minDate = this.minDate;
    }

  }
  slectedDate() {
    this.dateSrv.newDate = this.toDayDate;
    this.dialogRef.close();
  }
  onNoClick() {
    this.dialogRef.close();

  }

  valueChange(ev: any) {
    this.dateSrv.newDate = ev;
    this.dialogRef.close();
    this.logger.log("new Date: ", ev);
  }
}
