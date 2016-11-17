import { User } from '../shared/models/user';
import { AuthenticationService, CurrentUserService } from '../shared/index';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'ca-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['login.component.css']
})

export class SignupComponent {

  errorMessage: string;
  private user:User;

  constructor(
    private signupService: AuthenticationService,
    private currentUserService: CurrentUserService,
    private router: Router,
    private notificationService: NotificationsService) {
      this.user = {email:''};
  }

  signup(user: User) {

    if (user.password !== user.password_confirmation) {
      this.notificationService.error('Failure',
        'Password and password confirmation do not match');
      return;
    }

    this.signupService.signupUser(user)
    .subscribe(
      (authenticatedUser:any) => {
        this.currentUserService.setCurrentUser(authenticatedUser);
        if(this.currentUserService.redirectUrl && this.currentUserService.redirectUrl.trim() !== '') {
          this.router.navigate([this.currentUserService.redirectUrl]);
        } else {
          this.router.navigate(['/']);
        }
        this.notificationService.success('Success',
          'You have been successfully logged in');
      },
      (err:any) => {
        let notificationTitle: string = 'Failure';
        if (err.status === 422) {
          this.notificationService.error(`${notificationTitle}`, `Email ${err.errors.email[0]}`);
        } else if (err.status === 0) {
          this.notificationService.error(`${notificationTitle}`, 'No internet access');
        } else {
          this.notificationService.error(`${notificationTitle}`, `${err.errors[0]}`);
        }
      }
    );

  }
}
