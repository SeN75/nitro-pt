import { Component, OnInit } from '@angular/core';
import { packages } from 'src/app/_common/globle';
import { DialogService } from 'src/app/_services/dialog.service';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  packages = packages;
  constructor(
    public lang: LanguageService,
    public dialogSrv: DialogService) {

  }

  ngOnInit(): void {
  }

}
