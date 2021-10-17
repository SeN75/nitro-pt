import { Component, Input, OnInit } from '@angular/core';
import { ClosedRequest } from 'src/app/_common/types';

@Component({
  selector: 'close-order-table',
  templateUrl: './close-order-table.component.html',
  styleUrls: ['./close-order-table.component.scss']
})
export class CloseOrderTableComponent implements OnInit {
  @Input() order: ClosedRequest[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
