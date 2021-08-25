import { NgModule } from '@angular/core';
import { DashboardRoutingMoudle } from './dashboard.routing.module';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { PackagesComponent } from './packages/packages.component';
import { WorksoutComponent } from './worksout/worksout.component';
import { SettingsComponent } from './settings/settings.component';

import { MatIconModule } from '@angular/material/icon';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { DietPlanViewDetailsComponent } from './diet-plan/diet-plan-view-details/diet-plan-view-details.component';
import { DietPlanEditDetailsComponent } from './diet-plan/diet-plan-edit-details/diet-plan-edit-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';
import { PackageDialogComponent } from './packages/package-dialog/package-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { WorkoutDialogComponent } from './worksout/workout-dialog/workout-dialog.component';
import { WorkoutTypeDialogComponent } from './worksout/workout-type-dialog/workout-type-dialog.component';
import { ExerciseScheduleComponent } from './worksout/exercise-schedule/exercise-schedule.component';
import { CategoryTypeDialogComponent } from './categories/category-type-dialog/category-type-dialog.component';
import { CategoriesTableComponent } from './categories/categories-table/categories-table.component';
import { CategoriesDialogComponent } from './categories/categories-dialog/categories-dialog.component';
import { RouterModule } from '@angular/router';
import { SubscriberInfoComponent } from './subscribers/subscriber-info/subscriber-info.component';
import { OrderInfoComponent } from './orders/order-info/order-info.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    SubscribersComponent,
    OrdersComponent,
    CategoriesComponent,
    PackagesComponent,
    WorksoutComponent,
    SettingsComponent,
    DietPlanComponent,
    DietPlanViewDetailsComponent,
    DietPlanEditDetailsComponent,
    PackagesComponent,
    PackageDialogComponent,
    WorkoutDialogComponent,
    WorkoutTypeDialogComponent,
    ExerciseScheduleComponent,
    CategoryTypeDialogComponent,
    CategoriesTableComponent,
    CategoriesDialogComponent,
    SubscriberInfoComponent,
    OrderInfoComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule,
    TranslateModule.forRoot(),
    DashboardRoutingMoudle,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    ComponentsModule,
    MatRippleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserModule,
    Ng2SearchPipeModule
  ],
  exports: [],
  entryComponents: [
    PackageDialogComponent,
    WorkoutTypeDialogComponent,
    WorkoutDialogComponent,
    CategoryTypeDialogComponent,
    CategoriesDialogComponent
  ],
  providers: [

  ]
})

export class DashboardMoudle { }
