import { Route } from '@angular/router';

import { PathsListComponent } from './paths-list.component';
import { RoleGuard } from '../../shared/services/role-guard.service';
import { AuthGuard } from '../../shared/services/auth-guard.service';

export const PathsListRoutes: Route[] = [
  {
    path: '',
    component: PathsListComponent,
    canActivate: [AuthGuard, RoleGuard]
  }
];

