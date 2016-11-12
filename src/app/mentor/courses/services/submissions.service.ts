import { Injectable, Inject } from '@angular/core';
import { Response , Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { AuthHttpService } from '../../../shared/services/authHttp.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Injectable()

export class SubmissionsService {
  private _submissions: BehaviorSubject<any> = new BehaviorSubject([]);
  public submissionsObs: Observable<any> = this._submissions.asObservable();

  constructor(private authHttp: AuthHttpService, private errorHandlerService: ErrorHandlerService,
              @Inject('config') private config:any) {
  }

  loadSubmissions(taskId: number): Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/submission/tasks`;
    let params: URLSearchParams = new URLSearchParams();
    params.set('task_id', taskId.toString());
    let options = new RequestOptions({ search: params });
    return this.authHttp.get(url, options).cache()
    .map((res: Response) => {
      let data = res.json().data;
      let submissions: any[] = data.map((obj: any) => {
        return this._generateSubmissionObjWithQuestions(this._generateSubmissionObj(obj), obj.relationships.questions);
      });
      this._submissions.next(submissions);
      return submissions;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  updateSubmissionStatus(taskId: number, submission: any, status: string) {
    let updateStatusUrl: string = `${this.config.dev.apiUrl}/submission/tasks/${submission.id}`;
    let body = {'data': {'attributes': {'status': status}}};;
    let bodyString: string = JSON.stringify(body);
    let params: URLSearchParams = new URLSearchParams();
    params.set('task_id', taskId.toString());
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options: RequestOptions = new RequestOptions({ headers: headers, search: params });

    return this.authHttp.patch(updateStatusUrl, bodyString, options).cache()
    .map((res: Response) => {
      let updateSubmissions = this._submissions.getValue().map((sub: any) => {
        if(submission.id !== sub.id) {return sub;};
        let data = res.json().data;
        let submissionObj:any = this._generateSubmissionObj(data);
        submissionObj['questions'] = sub.questions;
        return submissionObj;
      });
      this._submissions.next(updateSubmissions);
      return({success: true});
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  private _generateSubmissionObj(obj: any) {
    let submission:any = {};
    submission['id'] = obj.id;
    for(let attribute in obj.attributes) {
      submission[attribute] = obj.attributes[attribute];
    };
    submission['task_id'] = obj.relationships.organization_curriculum_task.id;
    submission['user_id'] = obj.relationships.user.id;
    submission['status_changed_by_id'] = obj.relationships.status_changed_by_id.id;

    return submission;
  }

  private _generateSubmissionObjWithQuestions(submission: any, questionsArr: any) {
    let questions: any[] = [];
    questionsArr.forEach((question: any) => {
      let questionObj:any = {};
      questionObj['id'] = question.id;
      for(let attribute in question.attributes) {
        questionObj[attribute] = question.attributes[attribute];
      };
      let answer:any = {};
      let submitted_answer = question.relationships.answer;
      answer['id'] =  submitted_answer.id;
      for(let attribute in submitted_answer.attributes) {
        answer[attribute] = submitted_answer.attributes[attribute];
      };
      questionObj['submitted_answer'] = answer;
      questions.push(questionObj);
    });
    submission['questions'] = questions;
    return submission;
  }
}
