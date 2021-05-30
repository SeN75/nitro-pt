import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_services/dialog.service';
import { LanguageService } from 'src/app/_services/language.service';
import { CategoriesService } from './../../../../_services/categories.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  constructor(public dialogSrv: DialogService, public categorySrv: CategoriesService, public lang: LanguageService) {

  }

  ngOnInit(): void {
    this.categorySrv.checkOfCategories()
  }


}
