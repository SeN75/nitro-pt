import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'subscription-info',
  templateUrl: './subscription-info.component.html',
  styleUrls: ['./subscription-info.component.scss']
})
export class SubscriptionInfoComponent implements OnInit {
  @Input() sub: any;
  constructor() { }

  ngOnInit(): void {

  }
  isEmpty() {
    return Object.entries(this.sub).length == 0
  }
}
