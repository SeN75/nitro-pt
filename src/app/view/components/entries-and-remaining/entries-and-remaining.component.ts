import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'entries-and-remaining',
  templateUrl: './entries-and-remaining.component.html',
  styleUrls: ['./entries-and-remaining.component.scss']
})
export class EntriesAndRemainingComponent implements OnInit {
  @Input() entries: any = {
    calories: 0,
    protein: 0,
    carp: 0,
    fat: 0
  }
  @Input() total: any = {
    calories: 2000,
    protein: 1000,
    carp: 500,
    fat: 500
  }
  constructor() { }

  ngOnInit(): void {
  }

}
