import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shalabi',
  templateUrl: './shalabi.component.html',
  styleUrls: ['./shalabi.component.scss']
})
export class ShalabiComponent implements OnInit {

  message = '';
  dtOptions: DataTables.Settings = {};

  constructor() { }


  ngOnInit(): void {
    this.dtOptions = {
      // ajax: 'data/data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }],
    };
  }
}
