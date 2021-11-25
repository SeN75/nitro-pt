import { Component, HostListener, OnInit } from '@angular/core';
import { categories, sideMenu } from './../../_common/globle';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from 'src/app/_services/dialog.service';
import { CookieService } from 'ngx-cookie-service';
import { IdentityService } from 'src/app/_services/identity/identity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sideMenu = sideMenu;
  activeLink = '';
  userActivity: any;
  userInactive: Subject<any> = new Subject();
  isSideMenu = false;
  constructor(
    private identitySrv: IdentityService,
    private router: Router,
    private dialogSrv: DialogService,
    private cookiesSrv: CookieService) {

  }
  signOut() {
    this.identitySrv.logout();
  }

  // setTimeout() {
  //   this.userActivity = setTimeout(() => this.userInactive.next(undefined), 180000);
  // }
  // @HostListener('window:keyup') refreshUserStateKeyUp() {
  //   this._refreshState();
  // }
  // @HostListener('window:mousemove') refreshUserState() {
  //   this._refreshState()
  // }
  // ngOnInit(): void {
  //   this.setTimeout();
  //   this.userInactive.subscribe(() => {
  //     if (localStorage.getItem('refreshToken'))
  //       this.dialogSrv.inactiveDialog()
  //   });
  //   this.activeLink = (this.router.url).split('/dashboard/')[1];
  // }
  // _refreshState() {
  //   if (localStorage.getItem('refreshToken') && this.cookiesSrv.get('loggedin')) {
  //     clearTimeout(this.userActivity);
  //     console.log('d')
  //     this.setTimeout();
  //   }
  // }
}
