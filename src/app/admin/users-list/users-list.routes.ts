import { Route } from '@angular/router';

import {UsersListComponent} from './users-list.component';

import {RoleGuard} from '../../shared/index';
import {AuthGuard} from '../../shared/index';

export const UsersListRoutes: Route[] = [
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard, RoleGuard]
  }
];
