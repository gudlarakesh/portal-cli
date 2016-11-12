import { Injectable, Inject } from '@angular/core';
import { Response , Headers, RequestOptions} from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthHttpService, ErrorHandlerService } from '../../../shared/services/index';
import { Cohort } from '../models/index';


@Injectable()
export class CohortListService {
  // allCohorts: any[];

  public cohortsObs: Observable<Cohort[]>;
  private allCohorts: BehaviorSubject<Cohort[]>;

  constructor(private apiService: AuthHttpService, private errorHandlerService: ErrorHandlerService, @Inject('config') private config:any) {
    this.allCohorts = new BehaviorSubject([]);
    this.cohortsObs = this.allCohorts.asObservable();
  }

  postSubmitCohort(submitCohort: String): Observable<any> {
    let addSubmitCohortUrl: string = `${this.config.dev.apiUrl}/cohorts`;
    let body = {data: {attributes : {title : submitCohort}}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.apiService.post(addSubmitCohortUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let cohort: Cohort = {
        id: data.id,
        title: data.attributes.title
      };
      this.allCohorts.next(this.allCohorts.getValue().concat(cohort));
      return cohort;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  loadCohorts() :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/cohorts`;
    return this.apiService.get(url)
    .map((res: Response) => {
      let cohorts: Cohort[] = res.json().data.map((obj: any) => {
        return {id: obj.id, title: obj.attributes.title};
      });
      this.allCohorts.next(cohorts);
      return cohorts;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

updateChapter(id: number,name: string) :Observable<any> {
    let editChapterUrl: string = `${this.config.dev.apiUrl}/cohorts/${id}`;
    let body = {data: {attributes : {title : name}}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.apiService.patch(editChapterUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let cohort: Cohort = {
        id: data.id,
        title: data.attributes.title
      };
      this.allCohorts.next(this.allCohorts.getValue().map((oldCohort) => {
        if(oldCohort.id === cohort.id) {
          return cohort;
        } else return oldCohort;
      }));
      return cohort;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deleteCohort(cohortId: number) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/cohorts/${cohortId}`;
    return this.apiService.delete(url)
    .map((res: Response) => {
      this.allCohorts.next(this.allCohorts.getValue().filter(obj => obj.id !== cohortId));
      return cohortId;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

}
