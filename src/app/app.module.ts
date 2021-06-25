import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LandingPageComponent } from './view/landing-page/landing-page.component';
import { RegistrationComponent } from './view/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardRoutingMoudle } from './view/dashboard/dashboard.routing.module';
import { CategoryCardComponent } from './view/components/category-card/category-card.component';
import { BaseComponent } from './view/components/base/base.component';
import { DialogComponent } from './view/components/dialog/dialog.component';

// functions for translet service {
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

import { DataTablesModule } from "angular-datatables";
import { PackageCardComponent } from './view/components/package-card/package-card.component';
import { ShalabiComponent } from './view/components/shalabi/shalabi.component';
import { InfoItemComponent } from './view/components/info-item/info-item.component';
import { DashboardMoudle } from './view/dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    RegistrationComponent,
    /* Shalabi Components */
    PackageCardComponent,
    ShalabiComponent,
    InfoItemComponent,

    /* Alsaggaf Components */
    CategoryCardComponent,
    BaseComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DashboardMoudle,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TranslateModule,
    TranslateModule.forRoot({ // this is for translate
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
