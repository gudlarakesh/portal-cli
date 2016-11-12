import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { PathsService} from './services/index';
import { PathsListComponent } from './paths-list/index';
import { pathsRoutes } from './paths.routes';

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule.forChild(pathsRoutes)],
    declarations: [PathsListComponent],
    exports: [ PathsListComponent],
    providers:[PathsService]
})

export default class PathsModule { }
