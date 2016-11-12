import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { Route } from '@angular/router';

export const AuthenticateRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
