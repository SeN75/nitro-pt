import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/_common/globle';
import { DialogService } from './../../../_services/dialog.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  categories = categories;

  constructor(public dialogSrv: DialogService) { }

  ngOnInit(): void {
  }

}
