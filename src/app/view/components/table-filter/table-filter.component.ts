import { Component, Input, OnInit } from '@angular/core';
import { FilteringService } from 'src/app/_services/filtering.service';
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
  constructor(
    private filterSrv: FilteringService
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
    console.log(this.data)
  }
}
