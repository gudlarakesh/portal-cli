import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { PathsModule } from '../paths/paths.module';
// Note - Importing AdminModule here results in a error - Need to analyze and fix it
// import { AdminModule } from '../admin/admin.module';
import { CohortListRoutes } from './cohorts-list/';
import { CohortListComponent } from './cohorts-list/cohort-list.component';
import { CohortListService, CohortRolesService } from './services/index';
import { CohortDetailsComponent} from './cohort-details/cohort-details.component';
import { UsersService } from '../admin/services/index';

@NgModule({
    imports: [CommonModule, SharedModule, PathsModule, RouterModule.forChild(CohortListRoutes)],
    declarations: [CohortListComponent, CohortDetailsComponent],
    exports: [CohortListComponent, CohortDetailsComponent],
    providers: [CohortListService, CohortRolesService, UsersService]
})

export default class CohortModule { }
