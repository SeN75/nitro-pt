import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbCalendarIslamicCivil, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { IslamicI18n } from 'src/app/_helpers/hijri-date';
import { DatepickerService } from 'src/app/_services/datepicker.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'date-hijri',
  templateUrl: './date-hijri.component.html',
  styleUrls: ['./date-hijri.component.scss'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n }
  ]
})
export class DateHijriComponent implements OnInit {

  @Input() minDate: any;
  @Input() startDate: any;
  @Input() maxDate: any;
  @Input() markDisabled: any;
  @Input() value: any;
  @Output() output = new EventEmitter();
  date: any;

  constructor(
    private logger: LoggerService,
    private dateSrv: DatepickerService) { }

  ngOnInit(): void {
  }

  _output(ev: any) {
    this.logger.log('date select: ', ev);
    this.date = ev;
  }
  slectedDate() {
    this.dateSrv.newDate = this.date;
    this._output(this.date)
    this.output.emit(this.date);
  }
}
