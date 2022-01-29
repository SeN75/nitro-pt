import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newOrders } from 'src/app/_common/globle';
import { DialogService } from 'src/app/_services/dialog.service';
import { ExercisesService } from 'src/app/_services/gym/exercises.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions/subscriptions.service';
import { completedOrders } from './../../../_common/globle';

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

  newRequestList: any[] = [];
  expiredRequest: any[] = [];
  isLoading = false;
  hasError = false;
  constructor(
    public dialogSrv: DialogService,
    public subscriptionSrv: SubscriptionsService,
    private logger: LoggerService,
    private router: Router,
  ) {
    this.getOrders()
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

  getOrders() {
    this.isLoading = true;
    this.hasError = false;
    this.subscriptionSrv.__briefRequestsList().subscribe((success: any) => {
      this.logger.log('briefRequestsList: ', success)
      this.expiredRequest = success.expired_requests.requests;
      this.newRequestList = success.new_requests.requests;
      this.logger.log('getRequestDetailsById this.expired_request: ', this.expiredRequest)
      this.logger.log('getRequestDetailsById this.new_request: ', this.newRequestList)
      this.loaded();

      let eCount = 1;
      let nCount = 1;

      this.expiredRequest.forEach(e => e.pos === eCount++);
      this.newRequestList.forEach(e => e.pos === nCount++);
    }, (error: HttpErrorResponse) => {
      this.hasError = false;

      this.logger.error('briefRequestsList: ', error)
    })
  }
  loaded() {
    setTimeout(() => this.isLoading = false, 500)
  }
}
