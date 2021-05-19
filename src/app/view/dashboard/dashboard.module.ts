import { NgModule } from '@angular/core';
import { DashboardRoutingMoudle } from './dashboard.routing.module';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { PackagesComponent } from './packages/packages.component';
import { WorksoutComponent } from './worksout/worksout.component';
import { SettingsComponent } from './settings/settings.component';


import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        SubscribersComponent,
        OrdersComponent,
        CategoriesComponent,
        PackagesComponent,
        WorksoutComponent,
        SettingsComponent
    ],
    imports: [
        DashboardRoutingMoudle,
        MatIconModule
    ],
    exports: []
})

export class DashboardMoudle { }
