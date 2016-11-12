import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';

import {AuthenticationService} from '../services/authentication.service';
import {CurrentUserService} from '../services/current-user.service';
/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  currentUser: User;

  constructor(
    private currentUserService: CurrentUserService,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn;
    this.authenticationService.isLoggedInEmitter.subscribe((newLoginStatus: boolean) => {
      this.isLoggedIn = newLoginStatus;
    });
    this.currentUser = this.currentUserService.currentUser;
    this.currentUserService.currentUserEmitter.subscribe((newUser: User) => {
      this.currentUser = newUser;
    });
  }

  signOutUser() {
    this.authenticationService.signoutUser()
    .subscribe(
      () => {
        this.authenticationService.isLoggedInEmitter.emit(false);
        this.currentUserService.removeCurrentUser();
        this.router.navigate(['/login']);
      },
      (err:any) => {
        this.authenticationService.isLoggedInEmitter.emit(false);
        this.currentUserService.removeCurrentUser();
        this.router.navigate(['/login']);
      }
    );
  }
}
