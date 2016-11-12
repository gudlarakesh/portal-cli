import { Route } from '@angular/router';

import { CoursesListComponent } from './index';

import { RoleGuard } from '../../shared/index';
import { AuthGuard } from '../../shared/index';

export const CoursesListRoutes: Route[] = [
  {
    path: '',
    component: CoursesListComponent,
    canActivate: [AuthGuard, RoleGuard]
  }
];
