import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_services/dialog.service';
import { BankAccountsService } from 'src/app/_services/financial/bank-accounts.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  coachOptions: DataTables.Settings = {};

  constructor(
    public identitySrv: IdentityService,
    public bankSrv: BankAccountsService,
    public dialogSrv: DialogService,
    public lang: LanguageService) { }

  ngOnInit(): void {
    this.coachOptions = {
      // ajax: 'data/data.json',
      columns: [
        { title: "name", data: "coa.first_name_ar" },
        { title: "email", data: "coa.email" },
        { title: "phone-number", data: "coa.phone_number" },
      ],
    };
    this.dtOptions = {
      columns: []
    }
  }

}
