import { Component, OnInit } from '@angular/core';
import { subscribers } from 'src/app/_common/globle';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {
  subscribers = subscribers;
  dtOptions: DataTables.Settings = {};

  constructor(public dialogSrv: DialogService) { }

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

}
