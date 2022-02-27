import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdentityService } from 'src/app/_services/identity/identity.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isSideMenu = false;
  @Input() isProfile = false;
  @Input() isLoggedin = false;
  @Output() change = new EventEmitter<boolean>();

  constructor(public identitySrv: IdentityService) {}
  changeValue(val: boolean) {
    this.change.emit(val);
  }
  ngOnInit(): void {}
  signOut() {
    this.identitySrv.logout();
    window.location.reload();
  }
}
