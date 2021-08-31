import { Component, HostListener, OnInit } from '@angular/core';
import { categories, sideMenu } from './../../_common/globle';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sideMenu = sideMenu;
  activeLink = '';
  userActivity: any;
  userInactive: Subject<any> = new Subject();
  constructor(private router: Router, private dialogSrv: DialogService) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.dialogSrv.inactiveDialog());
  }


  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 120000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
  ngOnInit(): void {
    this.activeLink = (this.router.url).split('/dashboard/')[1];
    console.log(this.activeLink)
  }

}
