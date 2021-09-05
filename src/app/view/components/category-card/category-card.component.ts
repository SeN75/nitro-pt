import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from './../../../_services/dialog.service';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  @Input() category: any;
  constructor(public dialogSrv: DialogService) { }

  ngOnInit(): void {
  }

}
