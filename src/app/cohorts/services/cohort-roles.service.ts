import { Injectable, Inject } from '@angular/core';
import { Response , Headers, RequestOptions} from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { AuthHttpService, ErrorHandlerService } from '../../shared/services/index';
import { UsersService } from '../../admin/services/index';
import { User } from '../../shared/models/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CohortRolesService {

  public cohortManagersObs: Observable<User[]>;
  public cohortMembersObs: Observable<User[]>;
  private allCohortManagers: BehaviorSubject<User[]>;
  private allCohortMembers: BehaviorSubject<User[]>;

  constructor(private userServices: UsersService, private apiService: AuthHttpService, private errorHandlerService: ErrorHandlerService, @Inject('config') private config:any ) {
    this.allCohortManagers = new BehaviorSubject([]);
    this.cohortManagersObs = this.allCohortManagers.asObservable();
    this.allCohortMembers = new BehaviorSubject([]);
    this.cohortMembersObs = this.allCohortMembers.asObservable();
  }

  loadAllUsers():Observable<User[]> {
    return this.userServices.loadUsers();
  }

  postCohortManager(cohortID: number, userId: number): Observable<any> {
    let addCohortManagerUrl: string = `${this.config.dev.apiUrl}/cohorts/${cohortID}/managers`;
    let body = {user_id: userId};
    // let body = {};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.apiService.post(addCohortManagerUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let user: User = {
        id: data.id,
        email: data.email
      };
      this.allCohortManagers.next(this.allCohortManagers.getValue().concat(user));
      return user;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  getAssignedManagers(cohortID: number) {
    let url: string =  `${this.config.dev.apiUrl}/cohorts/${cohortID}/managers`;
    return this.apiService.get(url)
    .map((res: Response) => {
      let users: User[] = res.json().data.map((obj: any) => {
        return {id: obj.id, email: obj.attributes.email};
      });
      this.allCohortManagers.next(users);
      return users;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deleteCohortManager(cohortId: number, userId: number) {
    let url: string =  `${this.config.dev.apiUrl}/cohorts/${cohortId}/managers/${userId}`;
    return this.apiService.delete(url)
    .map((res: Response) => {
      this.allCohortManagers.next(this.allCohortManagers.getValue().filter(obj => obj.id !== userId));
      return userId;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  // CRD Methods to manage Members of a cohort

  postCohortMember(cohortID: number, userId: number): Observable<any> {
    let addCohortMemberUrl: string = `${this.config.dev.apiUrl}/cohorts/${cohortID}/members`;
    let body = {user_id: userId};
    // let body = {};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.apiService.post(addCohortMemberUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let user: User = {
        id: data.id,
        email: data.email
      };
      this.allCohortMembers.next(this.allCohortMembers.getValue().concat(user));
      return user;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  getAssignedMembers(cohortID: number) {
    let url: string =  `${this.config.dev.apiUrl}/cohorts/${cohortID}/members`;
    return this.apiService.get(url)
    .map((res: Response) => {
      let users: User[] = res.json().data.map((obj: any) => {
        return {id: obj.id, email: obj.attributes.email};
      });
      this.allCohortMembers.next(users);
      return users;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deleteCohortMember(cohortId: number, userId: number) {
    let url: string =  `${this.config.dev.apiUrl}/cohorts/${cohortId}/members/${userId}`;
    return this.apiService.delete(url)
    .map((res: Response) => {
      this.allCohortMembers.next(this.allCohortMembers.getValue().filter(obj => obj.id !== userId));
      return userId;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

}
