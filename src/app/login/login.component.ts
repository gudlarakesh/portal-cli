import { User } from '../shared/models/user';
import { AuthenticationService, CurrentUserService } from '../shared/index';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'ca-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  private user: User;
  constructor(
    private loginService: AuthenticationService,
    private currentUserService: CurrentUserService,
    private router: Router,
    private notificationService: NotificationsService) {
      this.user= {email:''};
     }

  login(user: User) {

    this.loginService.loginUser(user)
    .subscribe(
      (authenticatedUser:User) => {
        this.currentUserService.setCurrentUser(authenticatedUser);
        if(this.currentUserService.redirectUrl && this.currentUserService.redirectUrl.trim() !== '') {
          this.router.navigate([this.currentUserService.redirectUrl]);
        } else {
          this.router.navigate(['/']);
        }
      },
      (err:any) => {
        if (err.status === 0) {
          this.notificationService.error('Server Error', ' Please try again later.');
        } else {
          this.notificationService.error('Login Failure', `${err.errors[0]}`);
        }
      }
    );
  }
}
