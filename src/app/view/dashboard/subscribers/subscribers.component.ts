import { Component, OnInit } from '@angular/core';
import { subscribers } from 'src/app/_common/globle';
import { DialogService } from 'src/app/_services/dialog.service';
import { SubscribersService } from 'src/app/_services/subscriptions/subscribers.service';
import { Router } from '@angular/router';
import { SubscriptionsService } from 'src/app/_services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  subsList: any = [];
  isLoading = true;
  hasError = false;

  constructor(
    public dialogSrv: DialogService,
    public subscribersSrv: SubscriptionsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getData()
    this.dtOptions = {
      // ajax: 'data/data.json',
      columns: [{

      }],
    };
  }

  subscribersDetails(sub: any) {

    let id: string = sub.id.replace("#", '');

    this.router.navigateByUrl('/dashboard/subscribers/' + id + '/client-details')
  }
  getData() {
    this.isLoading = true;
    this.hasError = false
    this.subscribersSrv.__briefSubscriptionsLis().then((success: any) => {
      this.subsList = success.subscriptions;
      console.log(this.subsList)
      this.loaded()

    }, (error) => {
      this.hasError = true;
    })
  }
  loaded() {
    setTimeout(() => this.isLoading = false, 500)
  }
}
