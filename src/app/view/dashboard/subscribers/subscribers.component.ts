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
  subscribers = subscribers;
  dtOptions: DataTables.Settings = {};

  constructor(
    public dialogSrv: DialogService,
    public subscribersSrv: SubscriptionsService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscribersSrv.briefSubscriptionsLis()
    this.dtOptions = {
      // ajax: 'data/data.json',
      columns: [{

      }],
    };
  }

  subscribersDetails(sub: any) {
    this.subscribersSrv.subscriper = sub;
    this.router.navigateByUrl('/dashboard/subscribers/client-details')
  }

}
