import { Injectable, Inject } from '@angular/core';
import { Response , Headers, RequestOptions} from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../../../shared/models/user';

import {ErrorHandlerService} from '../../../shared/services/error-handler.service';
import {AuthHttpService} from '../../../shared/services/authHttp.service';

@Injectable()
export class UsersService {

  public usersObs: Observable<User[]>;
  public rolesObs: Observable<string[]>;

  private _users: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private _roles: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private authHttp: AuthHttpService, private errorHandlerService: ErrorHandlerService,
              @Inject('config') private config:any) {
    this.rolesObs = this._roles.asObservable();
    this.usersObs = this._users.asObservable();
  }

  loadUsers() :Observable<User[]> {
    if (!this._users.getValue().length) {
      let url: string =  `${this.config.dev.apiUrl}/users`;
      return this.authHttp.get(url)
      .map((res: Response) => {
        let users: User[] = res.json().data.map((obj: any) => {
          return {id: obj.id, email: obj.attributes.email, roles: obj.attributes.roles};
        });
        this._roles.next(res.json().meta.all_roles);
        this._users.next(users);
        return users;
      })
      .catch((error:any) => {
        let errObj = this.errorHandlerService.handleError(error);
        return Observable.throw(errObj);
      });
    }else {
      return this.usersObs;
    }
  }

  addRole(user: User, role: string) {
    let addRoleUrl: string = `${this.config.dev.apiUrl}/users/${user.id}/roles`;
    let body = {data:{attributes: {name: role}}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(addRoleUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let user: User = {
        id: data.id,
        email: data.attributes.email,
        roles: data.attributes.roles
      };
      this._users.next(this._users.getValue().map((oldUser) => {
        if(oldUser.id === user.id) {
          return user;
        } else return oldUser;
      }));
      return user;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deleteRole(user: User, role: string) {
    let deleteRoleUrl: string = `${this.config.dev.apiUrl}/users/${user.id}/roles/${role}`;
    return this.authHttp.delete(deleteRoleUrl)
    .map((res: Response) => {
      let data = res.json().data;
      let user: any = {
        id: data.id,
        email: data.attributes.email,
        roles: data.attributes.roles
      };
      this._users.next(this._users.getValue().map((oldUser) => {
        if(oldUser.id === user.id) {
          return user;
        } else return oldUser;
      }));
      return user;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });

  }
}
