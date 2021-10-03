import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'close-order-table',
  templateUrl: './close-order-table.component.html',
  styleUrls: ['./close-order-table.component.scss']
})
export class CloseOrderTableComponent implements OnInit {
  @Input() order: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
