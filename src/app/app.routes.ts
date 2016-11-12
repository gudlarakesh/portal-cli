import { AuthGuard } from './shared/index';
import { RoleGuard } from './shared/index';
import { Routes } from '@angular/router';
import { AuthenticateRoutes } from './login/index';
import { HomeRoutes } from './mentor/+home/index';

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
  loadChildren: 'app/mentor/courses/courses.module'
}
];

const pathsRoutes: Routes = [
{
  path: 'paths',
  loadChildren: 'app/mentor/paths/paths.module'
}
];

const adminRoutes: Routes = [
{
  path: 'admin',
  loadChildren: 'app/mentor/admin/admin.module'
}
];

const cohortRoutes: Routes = [
{
  path: 'cohorts',
  loadChildren: 'app/mentor/cohorts/cohorts.module'
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
