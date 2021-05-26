import { Component, OnInit } from '@angular/core';
import { categories, sideMenu } from './../../_common/globle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideMenu = sideMenu;
  constructor() { }

  ngOnInit(): void {
  }

}
