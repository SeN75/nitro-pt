import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { PackagesComponent } from './packages/packages.component';
import { SettingsComponent } from './settings/settings.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { WorksoutComponent } from './worksout/worksout.component';

const children: Routes = [
    { component: SubscribersComponent, path: 'subscribers' },
    { component: OrdersComponent, path: 'orders' },
    { component: CategoriesComponent, path: 'categories' },
    { component: PackagesComponent, path: 'packages' },
    { component: WorksoutComponent, path: 'worksout' },
    { component: SettingsComponent, path: 'settings' },

]
const routes: Routes = [
    { component: DashboardComponent, path: 'dashboard', children: children },
    { component: DashboardComponent, path: '', children: children }

];


@NgModule({
    imports: [
        RouterModule,
        RouterModule.forChild(routes)
    ]
})



export class DashboardRoutingMoudle { }