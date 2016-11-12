import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';

import {User} from '../models/user';

import { CurrentUserService } from './current-user.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private notificationService: NotificationsService,
    private location: Location,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser: User = this.currentUserService.getCurrentUser();

    const adminRoutes: any = {
      list: ['/admin', '/cohorts'],
      role: 'admin'
    };

    const curriculumEditorRoutes: any = {
      list: ['/courses'],
      role: 'curriculum_editor'
    };

    for(let routes of [adminRoutes, curriculumEditorRoutes]) {
      for (let route of routes.list) {
        if(state.url.startsWith(route)) {
          if(currentUser.roles.includes(routes.role)) {
            return true;
          } else {
            this.notificationService.alert('UnAuthorized Access', 'You are not authorized for this route.');
            this.router.navigate([this.location.path()]);
            return false;
          }

        }
      }
    }

    return true;
  }
}
