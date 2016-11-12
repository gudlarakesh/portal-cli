import {User} from '../models/user';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CurrentUserService {

  public redirectUrl: string;

  public currentUser: User;
  public currentUserEmitter = new EventEmitter<User>();

  constructor() {
    this.currentUserEmitter.subscribe((user: User) => {
      this.currentUser = user;
    });
    let localStorageUser:any = JSON.parse(localStorage.getItem('currentUser'));
    if(localStorageUser) {
      this.setCurrentUser(localStorageUser);
    } else {
      this.setCurrentUser(null);
    }
  }

  public setCurrentUser(newUser: User): void {
    if(newUser && !newUser.roles) {
      newUser.roles = [];
    }
    this.currentUserEmitter.emit(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }

  public getCurrentUser() :User {
    return this.currentUser;
  }

  public removeCurrentUser() {
    this.currentUserEmitter.emit(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authStoredHeaders');
  }
}
