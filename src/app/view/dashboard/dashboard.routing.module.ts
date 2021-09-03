import { DietPlanEditDetailsComponent } from './diet-plan/diet-plan-edit-details/diet-plan-edit-details.component';
import { DietPlanViewDetailsComponent } from './diet-plan/diet-plan-view-details/diet-plan-view-details.component';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { ShalabiComponent } from './../components/shalabi/shalabi.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../components/base/base.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { PackagesComponent } from './packages/packages.component';
import { SettingsComponent } from './settings/settings.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { WorksoutComponent } from './worksout/worksout.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

const children: Routes = [
  { component: BaseComponent, path: 'base' },
  { component: SubscribersComponent, path: 'subscribers' },
  { component: OrdersComponent, path: 'orders' },
  { component: CategoriesComponent, path: 'categories' },
  { component: PackagesComponent, path: 'packages' },
  { component: WorksoutComponent, path: 'worksout' },
  { component: SettingsComponent, path: 'settings' },
  { component: ShalabiComponent, path: 'shalabi' },
  { component: DietPlanComponent, path: 'diet' },
  { component: DietPlanViewDetailsComponent, path: 'diet/:id/view' },
  { component: DietPlanEditDetailsComponent, path: 'diet/:id/edit' },

]
const routes: Routes = [
  { component: DashboardComponent, path: 'dashboard', children: children },
  { component: DashboardComponent, path: '', children: children },

];


@NgModule({
  imports: [
    RouterModule,
    RouterModule.forChild(routes)
  ]
})



export class DashboardRoutingMoudle { }
