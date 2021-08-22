import { Component, OnInit } from '@angular/core';
import { packages } from 'src/app/_common/globle';
import { DialogService } from 'src/app/_services/dialog.service';
import { PackagesService } from 'src/app/_services/financial/packages.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  packages = packages;
  pack: any = []
  constructor(
    public lang: LanguageService,
    public dialogSrv: DialogService,
    private logger: LoggerService,
    public packSrv: PackagesService) {
    this.packSrv.getPackagesList()
  }

  ngOnInit(): void {
  }

}
