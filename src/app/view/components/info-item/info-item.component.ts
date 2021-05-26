import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss']
})

export class InfoItemComponent implements OnInit {

  @Input() info_item_img: string = '';
  @Input() info_item_title: string = '';
  @Input() info_item_value: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
