import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { studentRoutes } from './student.routes';
import { StudentHomeComponent } from './student-home/index';
import { StudentTaskListComponent, StudentTaskContainerComponent } from './student-task-list/index';
import { StudentTaskService, TaskDetailResolve, TaskListResolve, TaskDescriptionResolve } from './services/index';
import { StudentTaskDescriptionComponent } from './student-task-description/index';

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule.forChild(studentRoutes)],
    declarations: [StudentHomeComponent, StudentTaskListComponent,
     StudentTaskDescriptionComponent, StudentTaskContainerComponent],
    providers: [StudentTaskService, TaskDescriptionResolve, TaskListResolve, TaskDetailResolve]
})

export default class StudentModule { }
