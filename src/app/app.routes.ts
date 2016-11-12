import { AuthGuard } from './shared/index';
import { RoleGuard } from './shared/index';
import { Routes } from '@angular/router';
import { AuthenticateRoutes } from './login/index';
import { HomeRoutes } from './+home/index';

const studentsRoutes: Routes = [
{
  path: 'tasks',
  loadChildren: 'app/student/student.module',
  canActivate: [AuthGuard, RoleGuard]
}
];

const courseRoutes: Routes = [
{
  path: 'courses',
  loadChildren: 'app/courses/courses.module'
}
];

const pathsRoutes: Routes = [
{
  path: 'paths',
  loadChildren: 'app/paths/paths.module'
}
];

const adminRoutes: Routes = [
{
  path: 'admin',
  loadChildren: 'app/admin/admin.module'
}
];

const cohortRoutes: Routes = [
{
  path: 'cohorts',
  loadChildren: 'app/cohorts/cohorts.module'
}
];

export const routes: Routes = [
  ...HomeRoutes,
  ...studentsRoutes,
  ...courseRoutes,
  ...pathsRoutes,
  ...adminRoutes,
  ...AuthenticateRoutes,
  ...cohortRoutes
];
