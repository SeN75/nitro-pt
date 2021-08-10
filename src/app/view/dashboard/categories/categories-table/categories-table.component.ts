import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/_services/dialog.service';
import { LanguageService } from 'src/app/_services/language.service';
import { FoodCategoriesService } from '../../../../_services/dite/food-categories.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  constructor(public dialogSrv: DialogService, public categorySrv: FoodCategoriesService, public lang: LanguageService) {

  }

  ngOnInit(): void {
    this.categorySrv.checkOfCategories()
  }


}
