import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss']
})

export class InfoItemComponent implements OnInit {

  @Input() info_item_img: any = '';
  @Input() info_item_title: any = '';
  @Input() info_item_value: any = '';

  constructor() { }

  ngOnInit(): void {
  }

}
