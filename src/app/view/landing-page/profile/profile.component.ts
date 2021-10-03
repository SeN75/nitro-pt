import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/_services/language.service';
import { IdentityService } from './../../../_services/identity/identity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public identitySrv: IdentityService,
    public lang: LanguageService

  ) { }

  ngOnInit(): void {
  }

}
