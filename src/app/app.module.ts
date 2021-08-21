import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ShalabiComponent } from './view/components/shalabi/shalabi.component';
import { DashboardMoudle } from './view/dashboard/dashboard.module';
import { RegistrationModule } from './view/registration/registration.module';
import { ComponentsModule } from './view/components/components.module';
import { InfoItemComponent } from './view/components/info-item/info-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NaitroInterceptor } from './_helpers/interceptors';
import { AuhtGuardGuard } from './_helpers/auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    RegistrationComponent,
    /* Shalabi Components */
    ShalabiComponent,

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
    RegistrationModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,
    MatFormFieldModule,
    MatSnackBarModule,
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
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NaitroInterceptor,
      multi: true
    },
    AuhtGuardGuard
  ],
  exports: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
