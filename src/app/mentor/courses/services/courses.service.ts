import { Injectable, Inject } from '@angular/core';
import { Response , Headers, RequestOptions} from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Course } from '../models/course';

import { AuthHttpService } from '../../../shared/services/authHttp.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Injectable()
export class CoursesService {
  public coursesObs: Observable<Course[]>;
  private _courses: BehaviorSubject<Course[]>;

  constructor(private authHttp: AuthHttpService, private errorHandlerService: ErrorHandlerService,
              @Inject('config') private config:any) {
    this._courses = new BehaviorSubject([]);
    this.coursesObs = this._courses.asObservable();
  }

  addCourse(course: Course) :Observable<any> {
    let url: string = `${this.config.dev.apiUrl}/organization_curriculum/courses`;
    let body = {data:{attributes: course}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(url, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let course: any = {
        id: data.id,
        title: data.attributes.title
      };
      this._courses.next(this._courses.getValue().concat(course));
      return course;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  updateCourse(course: Course) :Observable<any> {
    let editCourseUrl: string = `${this.config.dev.apiUrl}/organization_curriculum/courses/${course.id}`;
    let body = {data:{attributes: course}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.patch(editCourseUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let course: any = {
        id: data.id,
        title: data.attributes.title,
        tag_names: data.attributes.tag_names
      };
      this._courses.next(this._courses.getValue().map((oldCourse) => {
        if(oldCourse.id === course.id) {
          return course;
        } else return oldCourse;
      }));
      return course;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  loadCourses() :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses`;
    return this.authHttp.get(url)
    .map((res: Response) => {
      let courses: Course[] = res.json().data.map((obj: any) => {
        return {id: obj.id, title: obj.attributes.title, tag_names: obj.attributes.tag_names};
      });
      this._courses.next(courses);
      return courses;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deleteCourse(id: number) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses/${id}`;
    return this.authHttp.delete(url)
    .map((res: Response) => {
      this._courses.next(this._courses.getValue().filter(chap => chap.id !== id));
      return true;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  loadCourseDetail(id:number):Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses/${id}`;
    return this.authHttp.get(url)
    .map((res: Response) => {
      let rsp = res.json().data;
      return {id: rsp.id, title: rsp.attributes.title};
    })
   .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

}
