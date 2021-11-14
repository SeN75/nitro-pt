import { Component, Input, OnInit } from '@angular/core';
import { FoodCategoriesService } from 'src/app/_services/dite/food-categories.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { DialogService } from './../../../_services/dialog.service';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  @Input() category: any;
  @Input() categoryid: any;
  constructor(
    public lang: LanguageService,
    public dialogSrv: DialogService,
    public categorySrv: FoodCategoriesService,
    private logger: LoggerService) {
    setTimeout(() => this.category.categoryid = this.categoryid, 1000)
  }

  ngOnInit(): void {
    this.logger.log("campound", this.category)
  }
  preview(src: string) {
    this.dialogSrv.preview(src, 'photo')
  }
}
