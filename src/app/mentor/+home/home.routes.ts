import {RoleGuard, AuthGuard, HomeGuard} from '../../shared/index';
import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard, RoleGuard, HomeGuard]
  }
];
