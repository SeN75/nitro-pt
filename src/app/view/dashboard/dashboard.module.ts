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
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        DietPlanEditDetailsComponent
    ],
    imports: [
        DashboardRoutingMoudle,
        MatIconModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: []
})

export class DashboardMoudle { }
