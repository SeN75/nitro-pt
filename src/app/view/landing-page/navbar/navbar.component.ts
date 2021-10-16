import { Component, OnInit, Input } from '@angular/core';
import { IdentityService } from 'src/app/_services/identity/identity.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isLoggedin: boolean = false;
  @Input() isProfile: boolean = false;
  constructor(public identitySrv: IdentityService) { }

  ngOnInit(): void {
  }

}
