import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message = '';
  dtOptions: DataTables.Settings = {};

  constructor() { }

  someClickHandler(info: any): void {
    window.location = info.link_to_item_details;
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
      }, {
        title: '',
        data: 'link_to_item_details'
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };
  }
}

// $(document).ready(function() {
//   var table = $('.AVCTable').DataTable({
//       language: {
//           url: "./js/Arabic.json",
//           searchPlaceholder: 'ابحث عن إختبار',
//       },
//       searching: true,
//       pageLength: 6,
//       lengthChange: false,
//       order: [],
//       ordering: false
//   });
//   $('.AVCTable tbody').on('click', 'tr', function() {
//       var data = table.row(this).data();
//       get_link = data[0].split('href="')[1];
//       let regex = /(?=\.|[\"])/;
//       get_link = get_link.split(regex)[0];
//       window.location = get_link;
//   });
// });
