import { DummyComponent } from './dummy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { UiSwitchModule } from 'angular2-ui-switch';
import { MomentModule } from 'angular2-moment';

import { coursesRoutes } from './courses.routes';

import { CourseDetailsService,
   CoursesService,
   SubmissionsService } from './services/index';

import { SectionsListComponent, SectionComponent, SectionFormComponent} from './course-details/sections-list/index';
import { TaskDetailComponent } from './course-details/task-detail/index';
import { TaskSubmissionsComponent, TaskSubmissionComponent } from './course-details/task-submissions/index';
import { TasksListComponent, TaskFormComponent } from './course-details/tasks-list/index';

import { CoursesListComponent } from './courses-list/index';

import { TaskSubmissionsFilter } from './pipes/task-submissions-filter';

@NgModule({
    imports: [CommonModule, SharedModule, MomentModule, UiSwitchModule, RouterModule.forChild(coursesRoutes)],
    declarations: [CoursesListComponent,
        SectionsListComponent, TasksListComponent,
        SectionFormComponent, TaskDetailComponent, SectionComponent, TaskFormComponent,
        TaskSubmissionsComponent, TaskSubmissionComponent,TaskSubmissionsFilter, DummyComponent ],
    exports: [ CoursesListComponent, SectionsListComponent,SectionComponent,
        TaskDetailComponent, TasksListComponent, TaskSubmissionsComponent, TaskSubmissionComponent],
    providers:[CourseDetailsService, SubmissionsService, CoursesService]
})

export default class CoursesModule { }
