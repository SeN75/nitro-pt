import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { categories } from 'src/app/_common/globle';
import { DatepickerService } from 'src/app/_services/datepicker.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { DialogService } from './../../../_services/dialog.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  categories = categories;
  errors = ['قيمة المدة غير صالحة ، يجب أن تكون رقمًا أعلى من 0', 'ترتبط بعض الباقات بهذا الحساب المصرفي ، يرجى تغيير الحساب المصرفي في هذه الباقات لحذف الحساب المصرفي']
  dateTest: FormControl = new FormControl('')
  constructor(
    public dialogSrv: DialogService,
    private dateSrv: DatepickerService,
    private logger: LoggerService) { }

  ngOnInit(): void {
  }
  openDate() {
    this.dateSrv.dateInput('test', this.dateTest.value).subscribe(() => {

      if (this.dateSrv.isValueChange) {
        this.dateTest.setValue(this.dateSrv.dateToString());
        this.dateSrv.newDate = undefined;
        this.dateSrv.isValueChange = false;
      }
    })
  }
}
