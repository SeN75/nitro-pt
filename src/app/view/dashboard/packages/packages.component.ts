import { Component, OnInit } from '@angular/core';
import { packages } from 'src/app/_common/globle';
import { Package } from 'src/app/_common/types';
import { DialogService } from 'src/app/_services/dialog.service';
import { PackagesService } from 'src/app/_services/financial/packages.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  packages: Package[] = [];
  pack: any = []
  search: any;

  isLoading = true;
  hasError = false;
  constructor(
    public lang: LanguageService,
    public dialogSrv: DialogService,
    private logger: LoggerService,
    public packSrv: PackagesService) {
    this.packSrv.getPackagesList()
    this.getPackagesList()
  }

  ngOnInit(): void {
  }
  getPackagesList() {
    this.isLoading = true;
    this.hasError = false;
    this.packSrv.__getPackagesList().then((_pack: any) => {
      this.packages = _pack
      this.logger.log('packageList: ', this.packages)
      this.loaded()
    }, (error: HttpErrorResponse) => {
      this.hasError = true
      this.logger.error('packageList error: ', error)
    })
  }
  loaded() {
    setTimeout(() => this.isLoading = false, 500)
  }
}
