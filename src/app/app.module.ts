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
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { ComponentsModule } from './view/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    RegistrationComponent,
    /* Shalabi Components */
    ShalabiComponent,
    InfoItemComponent,

    /* Alsaggaf Components */
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
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({ // this is for translate
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DataTablesModule
  ],
  providers: [],
  exports: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
