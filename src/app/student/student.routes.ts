import { RoleGuard } from '../shared/index';
import { AuthGuard } from '../shared/index';
import { Route } from '@angular/router';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentTaskDescriptionComponent } from './student-task-description/index';
import { StudentTaskListComponent, StudentTaskContainerComponent } from './student-task-list/index';
import { TaskDescriptionResolve, TaskDetailResolve, TaskListResolve } from './services/index';

export const studentRoutes:Route[] = [
{
  path: '',
  component: StudentTaskContainerComponent,
  canActivate: [AuthGuard, RoleGuard],
  resolve: {
    tasks: TaskDescriptionResolve,
    submittedTasks : TaskListResolve
  },
  children : [
  {
    path:':id',
    component: StudentTaskDescriptionComponent,
    resolve : {
      taskDetail: TaskDetailResolve
    }
  }
  ]
},
{
  path: '',
  component: StudentTaskContainerComponent,
  canActivate: [AuthGuard, RoleGuard],
  resolve: {
    tasks: TaskDescriptionResolve,
    submittedTasks : TaskListResolve
  }
}
];
