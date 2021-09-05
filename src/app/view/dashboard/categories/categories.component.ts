import { Component, OnInit } from '@angular/core';
import { categoriesWithcompounds } from 'src/app/_common/globle';
import { DialogService } from './../../../_services/dialog.service';
import { Router } from '@angular/router';
import { CategoriesService } from './../../../_services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = categoriesWithcompounds;
  dtOptions: DataTables.Settings = {};

  constructor(public dialogSrv: DialogService, private categorySrv: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      // ajax: 'data/data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }],
    };
  }
  showCompunds(cat: any) {
    this.categorySrv.categories = cat;
    console.log(this.categorySrv.categories)
    this.router.navigateByUrl('/categories/compounds');
  }
}
