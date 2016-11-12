import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';

import {User} from '../models/user';

import { CurrentUserService } from './current-user.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private notificationService: NotificationsService,
    private location: Location,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser: User = this.currentUserService.getCurrentUser();

    if(currentUser.roles.includes('member')) {
      this.router.navigate(['/tasks']);
    }
    return true;
  }
}
