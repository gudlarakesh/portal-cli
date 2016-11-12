import { Route } from '@angular/router';

import {RoleGuard, AuthGuard} from '../../../shared/services/index';
import { CohortListComponent } from './cohort-list.component';
import { CohortDetailsComponent } from '../cohort-details/index';


export const CohortListRoutes: Route[] = [
  {
    path: '',
    component: CohortListComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: ':id',
    component: CohortDetailsComponent,
    canActivate: [AuthGuard, RoleGuard]
  }
];
