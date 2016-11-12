import { Routes } from '@angular/router';

import { CourseDetailsRoutes } from './course-details/course-details.routes';
import { CoursesListRoutes } from './courses-list/courses-list.routes';

export const coursesRoutes: Routes = [
  ...CoursesListRoutes,
  ...CourseDetailsRoutes
];
