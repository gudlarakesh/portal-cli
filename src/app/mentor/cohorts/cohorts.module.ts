import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
// Note - Importing AdminModule here results in a error - Need to analyze and fix it
// import { AdminModule } from '../admin/admin.module';
import { CohortListComponent, CohortListRoutes } from './cohorts-list/index';
import { CohortListService, CohortRolesService } from './services/index';
import { CohortDetailsComponent } from './cohort-details/index';
import { UsersService } from '../admin/services/index';

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule.forChild(CohortListRoutes)],
    declarations: [CohortListComponent, CohortDetailsComponent],
    exports: [CohortListComponent, CohortDetailsComponent],
    providers: [CohortListService, CohortRolesService, UsersService]
})

export default class CohortModule { }
