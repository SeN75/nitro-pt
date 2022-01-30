import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'subscriber-update',
  templateUrl: './subscriber-update.component.html',
  styleUrls: ['./subscriber-update.component.scss']
})
export class SubscriberUpdateComponent implements OnInit {
  @Output() updateData: any = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
