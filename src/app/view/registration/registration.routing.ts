
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

export const RegistrationRouting: Routes = [
  { component: ResetPasswordComponent, path: 'reset_password' },
  { component: LoginComponent, path: 'login' },
  { component: SignupComponent, path: 'sign_up' },

]

