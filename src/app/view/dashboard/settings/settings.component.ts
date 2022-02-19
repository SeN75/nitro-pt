import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_services/dialog.service';
import { BankAccountsService } from 'src/app/_services/financial/bank-accounts.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  coachOptions: DataTables.Settings = {};

  coachsError: any[] = [];
  staffError: any[] = [];
  profileError: any[] = [];
  constructor(
    public identitySrv: IdentityService,
    public bankSrv: BankAccountsService,
    public dialogSrv: DialogService,
    private logger: LoggerService,
    public lang: LanguageService) {
    this.getData()
  }

  ngOnInit(): void {

  }
  getData() {

    this.identitySrv.getAllCoaches().then().catch((res: any) => this.coachsError = res.message)
    this.identitySrv.getStaff().then().catch((res: any) => this.staffError = res.message);
    this.identitySrv.getUserProfileByJWT().then().catch((res: any) => this.profileError = res.message)
    this.bankSrv.getBankAccountsList()
  }
}
