import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'current-order-table',
  templateUrl: './current-order-table.component.html',
  styleUrls: ['./current-order-table.component.scss']
})
export class CurrentOrderTableComponent implements OnInit {
  @Input() order: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
