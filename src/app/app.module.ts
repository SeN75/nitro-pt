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
import { MatDatepickerModule } from '@angular/material/datepicker';

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
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './view/landing-page/navbar/navbar.component';
import { FooterComponent } from './view/landing-page/footer/footer.component';
import { DropzoneDirective } from './_directive/dropzone.directive';
import { ProfileComponent } from './view/landing-page/profile/profile.component';
import { PackageInfoTableComponent } from './view/landing-page/profile/package-info-table/package-info-table.component';
import { CurrentOrderTableComponent } from './view/landing-page/profile/current-order-table/current-order-table.component';
import { CloseOrderTableComponent } from './view/landing-page/profile/close-order-table/close-order-table.component';
import { DietplanSectionComponent } from './view/landing-page/profile/dietplan-section/dietplan-section.component';
import { SubscriptionInfoComponent } from './view/landing-page/profile/subscription-info/subscription-info.component';
import { AuthInterceptor, authInterceptorProviders } from './_helpers/Interceptor-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    DialogComponent,
    NavbarComponent,
    FooterComponent,
    DropzoneDirective,
    ProfileComponent,
    PackageInfoTableComponent,
    CurrentOrderTableComponent,
    CloseOrderTableComponent,
    DietplanSectionComponent,
    SubscriptionInfoComponent,
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
    MatDatepickerModule,
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
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuhtGuardGuard,
    CookieService
  ],
  exports: [
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
