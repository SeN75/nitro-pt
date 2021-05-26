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

  viewItemDetails(row: any): void {
    window.location =  row.getAttribute("href");
  }

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
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.viewItemDetails(row);
        });
        return row;
      }
    };
  }
}
