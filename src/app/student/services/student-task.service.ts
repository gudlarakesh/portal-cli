import { Injectable, Inject } from '@angular/core';
import { Response , Headers, RequestOptions} from '@angular/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

import { AuthHttpService } from '../../shared/services/index';
import { Task, SubmittedTask } from '../models/index';
import { Question } from '../../shared/models/question';

@Injectable()
export class StudentTaskService {

  public questionObs: Observable<Question[]>;
  public allTasksObs: Observable<Task[]>;
  public submittedTasksObs: Observable<Task[]>;

  public questions: BehaviorSubject<Question[]>;
  private allTasks: BehaviorSubject<Task[]>;
  private submittedTasks: BehaviorSubject<Task[]>;


  constructor(private apiService: AuthHttpService, @Inject('config') private config:any) {

    this.questions = new BehaviorSubject([]);
    this.allTasks = new BehaviorSubject([]);
    this.submittedTasks = new BehaviorSubject([]);

    this.questionObs = this.questions.asObservable();
    this.allTasksObs = this.allTasks.asObservable();
    this.submittedTasksObs = this.submittedTasks.asObservable();
  }

  // This will fetch all available tasks in a curriculum
  getAllTasks(): Observable<any> {
    return this.apiService.get(`${this.config.dev.apiUrl}/organization_curriculum/tasks.json`)
                    .map((res: Response) => {
                      this.allTasks.next(res.json().data);
                      return this.allTasks;
                    })
                    .catch(this.handleError);
  }

  // This will fetch all submitted tasks
  getSubmittedTasks(): Observable<any> {
    return this.apiService.get(`${this.config.dev.apiUrl}/submission/tasks.json`)
                    .map((res: Response) => {
                      let submittedTaskArr:Task[] = res.json().data;
                      this.submittedTasks.next(submittedTaskArr.map(submittedTask => this.extendSubmittedTask(submittedTask)));
                      return this.submittedTasks;
                    })
                    .catch(this.handleError);
  }


  extendSubmittedTask(task:Task):Task {
    let newTask:Task;
    newTask = _.find(this.allTasks.getValue(), o => o.id === task.relationships.organization_curriculum_task.id);
    newTask.attributes.status = task.attributes.status;
    newTask.attributes.isDone = true;
    newTask.submissionId = task.id;
    return newTask;
  }

  postSubmitTask(submitTask: Task): Observable<any> {
    let addSubmitTaskUrl: string = `${this.config.dev.apiUrl}/submission/tasks`;
    let body = {data: {relationships : {organization_curriculum_task :{ id: submitTask.id}}}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.apiService.post(addSubmitTaskUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let submittedTask:Task = this.extendSubmittedTask(res.json().data);
      this.allTasks.next(this.allTasks.getValue().concat(submittedTask));
      return res.json().data;
    })
    .catch(this.handleError);
  }

  // postAnswer
  postAnswer(task: Task, question: any) {
    let apiURL: string =
    `${this.config.dev.apiUrl}/submission/tasks/${task.submissionId}/questions/${question.id}/answers`;
    let body = {data: {attributes : {answer : question.answer }}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.apiService.post(apiURL, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      this.questions.next(this.questions.getValue().map((oldQuestion) => {
        if(oldQuestion.id === question.id) {
          question.answerId = data.id;
          question.answer = question.answer;
          return question;
        } else return oldQuestion;
      }));
      return res.json().data;
    })
    .catch(this.handleError);
  }

  updateAnswer(task: Task, question: any) {
    let apiURL: string =
    `${this.config.dev.apiUrl}/submission/tasks/${task.submissionId}/questions/${question.id}/answers/${question.answerId}`;
    let body = {data: {attributes : {answer : question.answer }}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.apiService.patch(apiURL, bodyString, options) // ...using post request
    .map((res:Response) => {
      this.questions.next(this.questions.getValue().map((oldQuestion) => {
        if(oldQuestion.id === question.id) {
          return question;
        } else return oldQuestion;
      }));
      return res.json().data;
    })
    .catch(this.handleError);
  }


  getAllDetailsOfTask(task:any) {
    let detailData:any = {
      questions: {},
      submissionId: 0
    };
    let questions: Question[] = task.relationships.questions.data.map((obj: any) => {
        let retObj = {id: obj.id, text: obj.attributes.text, answer_type: obj.attributes.answer_type};
        if (obj.relationships && obj.relationships.answer) {
          _.assign(retObj,{answerId: obj.relationships.answer.id, answer: obj.relationships.answer.attributes.text});
        }
        return retObj;
      });
    detailData.questions = questions;
    this.questions.next(questions);
    if (task.relationships.submission_task) {
      detailData.submissionId = task.relationships.submission_task.id;
      let submittedTask = _.find(this.submittedTasks.getValue(), o => o.submissionId === detailData.submissionId);
      detailData['status'] = submittedTask.attributes.status;
    }
    return detailData;
  }

  fetchTask(id:number):any {
    return this.apiService.get(`${this.config.dev.apiUrl}/organization_curriculum/tasks/${id}`)
                    .map((res: Response) => {
                      return res.json().data;
                    })
                    .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}


@Injectable()
export class TaskListResolve implements Resolve<any> {
  constructor(private ts: StudentTaskService) {}
  resolve(): Observable<any> | Promise<any> | any {
    return this.ts.getSubmittedTasks();
  }
}

@Injectable()
export class TaskDescriptionResolve implements Resolve<any> {
  constructor(private ts: StudentTaskService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.ts.getAllTasks();
  }
}

@Injectable()
export class TaskDetailResolve implements Resolve<any> {
  constructor(private ts: StudentTaskService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let id = +route.params['id'];
    return this.ts.fetchTask(id);
  }
}
