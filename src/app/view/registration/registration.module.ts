import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SelectProgramComponent } from './select-program/select-program.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JoinigFormComponent } from './joinig-form/joinig-form.component';
import { PersonalInfoComponent } from './joinig-form/personal-info/personal-info.component';
import { HealthInfoComponent } from './joinig-form/health-info/health-info.component';
import { MeasuringMethodComponent } from './joinig-form/measuring-method/measuring-method.component';
import { BodyPicFormComponent } from './joinig-form/body-pic-form/body-pic-form.component';
import { BackInfoComponent } from './joinig-form/back-info/back-info.component';
import { TipsComponent } from './joinig-form/body-pic-form/tips/tips.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  imports: [
    BrowserModule,
    TranslateModule,
    TranslateModule.forRoot(),
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    NgxMaterialTimepickerModule

  ],
  declarations: [ResetPasswordComponent, LoginComponent, SignupComponent, SelectProgramComponent, TermsAndConditionComponent, JoinigFormComponent, PersonalInfoComponent, HealthInfoComponent, MeasuringMethodComponent, BodyPicFormComponent, BackInfoComponent, TipsComponent, ChangePasswordComponent],
  exports: [ResetPasswordComponent, MatFormFieldModule],
  providers: []
})

export class RegistrationModule { }
