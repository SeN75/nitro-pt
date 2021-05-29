import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss']
})
export class PackageCardComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    if (this.with_button == false) {
      this.class_button = "hide_button"
    }
  }

  @Input() package_title: string = "";
  @Input() package_price: number = 0;
  @Input() package_months: number = 0;
  @Input() theme_number: number = 0;
  @Input() with_button: boolean = false;
  @Input() class_button: string = "";
}
