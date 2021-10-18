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
    public lang: LanguageService) {
    this.getData()
  }

  ngOnInit(): void {

  }
  getData() {
    this.identitySrv.getAllCoaches()
    this.identitySrv.getStaff();
    this.identitySrv.getUserProfileByJWT()
    this.bankSrv.getBankAccountsList()
  }
}
