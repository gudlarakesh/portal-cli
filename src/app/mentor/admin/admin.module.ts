import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import {UsersListComponent} from './users-list/users-list.component';

import {UsersService} from "./services/users.service";

import { routes } from './admin.routes';

@NgModule({
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
    declarations: [UsersListComponent],
    exports: [],
    providers: [UsersService]
})

export default class AdminModule { }
