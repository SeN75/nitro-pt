import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/_services/language.service';
import { IdentityService } from './../../../_services/identity/identity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pack = [
    { first_name_ar: 'احمد', middle_name_ar: 'محمد', start_date: '2021/01/01', end_date: '2021/01/01', memebership: "#1101545", status: 'newly' }
  ]
  order = [
    { order_no: "#1212", type: 'طلب جديد', status: 'قيد المعالجة', notes: '-' }
  ]
  constructor(
    public identitySrv: IdentityService,
    public lang: LanguageService

  ) { }

  ngOnInit(): void {
  }

}
