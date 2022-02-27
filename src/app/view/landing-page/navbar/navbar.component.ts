import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { TokenStorageService } from './../../../_services/identity/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() isLoggedin: boolean = this.tokenSrv.getRefreshToken() ? true : false;
  @Input() isProfile: boolean = false;
  mobileQuery?: MediaQueryList;
  isSideMenu = false;
  isMobil = false;
  constructor(
    public identitySrv: IdentityService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private tokenSrv: TokenStorageService
  ) {}
  private _mobileQueryListener?: () => void;

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  signOut() {
    this.identitySrv.logout();
    window.location.reload();
  }
}
