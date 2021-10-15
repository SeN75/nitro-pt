import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newOrders } from 'src/app/_common/globle';
import { DialogService } from 'src/app/_services/dialog.service';
import { ExercisesService } from 'src/app/_services/gym/exercises.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions/subscriptions.service';
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
    public subscriptionSrv: SubscriptionsService,
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
    this.subscriptionSrv.briefRequestsList()
  }
  showOrder(order: any) {
    console.log(order)
    let id: string = order.id.replace("#", '');
    this.subscriptionSrv.getRequestDetailsById(id);
    this.router.navigateByUrl(`orders/${id}/detail`)
  }
}
