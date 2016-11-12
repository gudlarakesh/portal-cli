import { Route } from '@angular/router';

import { RoleGuard, AuthGuard } from '../../shared/services/index';
import { StudentTaskContainerComponent } from './student-task-container.component';


export const CohortListRoutes: Route[] = [
  {
    path: '',
    component: StudentTaskContainerComponent,
    canActivate: [AuthGuard, RoleGuard]
  }
];
