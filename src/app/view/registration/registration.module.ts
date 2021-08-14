import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
    SlickCarouselModule

  ],
  declarations: [ResetPasswordComponent, LoginComponent, SignupComponent, SelectProgramComponent, TermsAndConditionComponent],
  exports: [ResetPasswordComponent, MatFormFieldModule],
  providers: []
})

export class RegistrationModule { }
