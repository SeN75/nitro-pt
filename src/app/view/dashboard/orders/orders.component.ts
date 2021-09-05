import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newOrders } from 'src/app/_common/globle';
import { DialogService } from 'src/app/_services/dialog.service';
import { WorkoutService } from 'src/app/_services/workout.service';
import { completedOrders } from './../../../_common/globle';
import { OrdersService } from './../../../_services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  newOrders = newOrders;
  completedOrders = completedOrders;
  constructor(
    public dialogSrv: DialogService,
    public orderSrv: OrdersService,
    private router: Router,
  ) { }

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
    this.dtOptions2 = {
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
  showOrder(order: any) {
    this.orderSrv.currentOrder = order;
    this.router.navigateByUrl(`orders/${order.orderNo}/detail`)
  }
}
