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
import { ExerciseScheduleComponent } from './worksout/exercise-schedule/exercise-schedule.component';
import { CategoriesTableComponent } from './categories/categories-table/categories-table.component';
import { SubscriberInfoComponent } from './subscribers/subscriber-info/subscriber-info.component';
import { OrderInfoComponent } from './orders/order-info/order-info.component';
import { AuhtGuardGuard } from 'src/app/_helpers/auth-guard.guard';

const children: Routes = [
  { component: BaseComponent, path: 'base' },
  { component: SubscribersComponent, path: 'subscribers' },
  { component: SubscriberInfoComponent, path: 'subscribers/client-details' },
  { component: OrdersComponent, path: 'orders' },
  { component: OrderInfoComponent, path: 'orders/:id/detail' },
  { component: CategoriesComponent, path: 'categories' },
  { component: CategoriesTableComponent, path: 'categories/:id/compounds' },
  { component: PackagesComponent, path: 'packages' },
  { component: WorksoutComponent, path: 'worksout' },
  { component: ExerciseScheduleComponent, path: 'worksout/:id/exercise' },
  { component: SettingsComponent, path: 'account-settings' },
  { component: ShalabiComponent, path: 'shalabi' },
  { component: DietPlanComponent, path: 'diet' },
  { component: DietPlanViewDetailsComponent, path: 'diet/:id/view' },
  { component: DietPlanEditDetailsComponent, path: 'diet/:id/edit' },
]
const routes: Routes = [
  { component: DashboardComponent, path: 'dashboard', children: children, canActivate: [AuhtGuardGuard] },
  { component: DashboardComponent, path: '', children: children, canActivate: [AuhtGuardGuard] }

];


@NgModule({
  imports: [
    RouterModule,
    RouterModule.forChild(routes)
  ]
})



export class DashboardRoutingMoudle { }
