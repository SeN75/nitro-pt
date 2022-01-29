import { Component, Input, OnInit } from '@angular/core';
import { FilteringService } from 'src/app/_services/filtering.service';
import { DatepickerService } from './../../../_services/datepicker.service';
import { filter } from 'rxjs/operators';
type Mode = 'search' | 'range' | 'order' | 'date' | 'search-order';

@Component({
  selector: 'tb-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  @Input() label: string = '';
  @Input() mode: Mode = 'search';
  @Input() list: string[] = [];
  @Input() data: any = [];
  @Input() _translate: string = '';

  dateInput: any;
  constructor(
    private filterSrv: FilteringService,
    private dateSrv: DatepickerService
  ) { }

  ngOnInit(): void {
  }
  fitler(type?: string) {
    if (this.mode == 'order') {
      if (type == 'asce')
        this.data = this.filterSrv.ascending(this.data, this.label)
      if (type == 'desce')
        this.data = this.filterSrv.descending(this.data, this.label)
    }
    else if (this.mode == 'search-order') {
      this.data = this.filterSrv.search(this.data, this.label, type || '')
    }
    else if (this.mode == 'date') {

      this.data = this.filterSrv.date(this.data, this.label, this.dateInput);

      console.log(this.dateInput)
    }
  }

  datePicker() {
    console.log(this.dateInput)
    this.dateSrv.dateInput(this._translate + '.' + this.label, this.dateInput).subscribe(() => {
      if (this.dateSrv.isValueChange) {
        this.dateInput = this.dateSrv.dateToString()
        this.fitler()
      }
    })
  }
}
