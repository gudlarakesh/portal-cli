import { Route } from '@angular/router';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { SectionsListComponent } from './sections-list/sections-list.component';
import { DummyComponent } from '../dummy.component';

import { RoleGuard } from '../../shared/index';
import { AuthGuard } from '../../shared/index';

export const CourseDetailsRoutes: Route[] = [
  {
    path: ':id/sections',
    component: SectionsListComponent,
    canActivate: [AuthGuard, RoleGuard],
        children:[
          { path: '', component: DummyComponent},
          { path: ':id/tasks', component: TasksListComponent,
            children: [
              { path: '', component: DummyComponent},
              { path: ':id', component: TaskDetailComponent, data:{canAddQuestion:true}}
            ]
          }
        ]
      }
  ];
