import { Component, OnInit } from '@angular/core';
import { categories, sideMenu } from './../../_common/globle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideMenu = sideMenu;
  activeLink = '';
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.activeLink = (this.router.url).split('/dashboard/')[1];
    console.log(this.activeLink)
  }

}
