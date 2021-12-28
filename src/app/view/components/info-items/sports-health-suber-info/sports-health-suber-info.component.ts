import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sports-health-suber-info',
  templateUrl: './sports-health-suber-info.component.html',
  styleUrls: ['./sports-health-suber-info.component.scss']
})
export class SportsHealthSuberInfoComponent implements OnInit {
  @Input() info: any;

  constructor() { }

  ngOnInit(): void {
  }

}
