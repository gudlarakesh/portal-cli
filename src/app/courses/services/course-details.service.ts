import { Injectable, Inject } from '@angular/core';
import { Response , Headers, RequestOptions} from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Question, Task, Section} from '../index';

import {AuthHttpService, ErrorHandlerService} from '../../shared/index';

@Injectable()
export class CourseDetailsService {

  private _sections: BehaviorSubject<Section[]> = new BehaviorSubject([]);
  public sectionsObs: Observable<Section[]> = this._sections.asObservable();

  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  public tasksObs: Observable<Task[]> = this._tasks.asObservable();

  private _questions: BehaviorSubject<Question[]> = new BehaviorSubject([]);
  public questionsObs: Observable<Question[]> = this._questions.asObservable();

  constructor(private authHttp: AuthHttpService, private errorHandlerService: ErrorHandlerService,
              @Inject('config') private config:any) {
  }

  //  Section CRUD:

  loadSections(courseId: number) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections`;

    return this.authHttp.get(url)
    .map((res: Response) => {
      let sections: Section[] = res.json().data.map((obj: any) => {
        return {id: obj.id, title: obj.attributes.title};
      });
      this._sections.next(sections);
      return sections;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  addSection(courseId: number, section: Section) :Observable<any> {
    let addSectionUrl: string = `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections`;
    let body = {data:{attributes: section}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(addSectionUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let section: Section = {
        id: data.id,
        title: data.attributes.title
      };
      this._sections.next(this._sections.getValue().concat(section));
      return section;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  updateSection(courseId: number, section: Section) :Observable<any> {
    let editSectionUrl: string = `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${section.id}`;
    let body = {data:{attributes: section}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.patch(editSectionUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let section: Section = {
        id: data.id,
        title: data.attributes.title
      };
      this._sections.next(this._sections.getValue().map((oldSection) => {
        if(oldSection.id === section.id) {
          return section;
        } else return oldSection;
      }));
      return section;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deleteSection(courseId: number, section: Section) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${section.id}`;
    return this.authHttp.delete(url)
    .map((res: Response) => {
      this._sections.next(this._sections.getValue().filter(sect => sect.id !== section.id));
      return section;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

//  Task CRUD:

  addTask(courseId: number,sectionId: number, task: Task) :Observable<any> {
    let addTaskUrl: string = `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${sectionId}/tasks`;
    let body = {data:{attributes: task}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(addTaskUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let task: Task = {
        id: data.id,
        title: data.attributes.title,
        description: data.attributes.description,
        published: data.attributes.published,
        deadline: data.attributes.deadline
      };
      this._tasks.next(this._tasks.getValue().concat(task));
      return task;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  loadTasks(courseId: number, sectionId: number) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${sectionId}/tasks`;

    return this.authHttp.get(url)
    .map((res: Response) => {
      let tasks: Task[] = res.json().data.map((obj: any) => {
        return {id: obj.id, title: obj.attributes.title, description: obj.attributes.description, published: obj.attributes.published, deadline: obj.attributes.deadline};
      });
      this._tasks.next(tasks);
      return tasks;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  updateTask(courseId: number, sectionId: number, task: Task) :Observable<any> {
    let editTaskUrl: string = `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${sectionId}/tasks/${task.id}`;
    let body = {data:{attributes: task}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.patch(editTaskUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let deadlineISO: string;
      if(data.attributes.deadline){
        deadlineISO = data.attributes.deadline.substring(0,data.attributes.deadline.length-1);
      }
      let task: Task = {
        id: data.id,
        title: data.attributes.title,
        description: data.attributes.description,
        published: data.attributes.published,
        deadline: deadlineISO
      };
      this._tasks.next(this._tasks.getValue().map((oldTask) => {
        if(oldTask.id === task.id) {
          return task;
        } else return oldTask;
      }));
      return task;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deleteTask(courseId: number, sectionId: number, task: Task) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${sectionId}/tasks/${task.id}`;
    return this.authHttp.delete(url)
    .map((res: Response) => {
      this._tasks.next(this._tasks.getValue().filter(tsk => tsk.id !== task.id));
      return task;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  getTask(courseId: number, sectionId: number, taskId: number) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${sectionId}/tasks/${taskId}`;
    return this.authHttp.get(url).cache()
    .map((res: Response) => {
      let data = res.json().data;
      let questions: Question[] = data.relationships.questions.data.map((obj: any) => {
        return {id: obj.id, text: obj.attributes.text,
                answer_type: obj.attributes.answer_type,
                answer: obj.attributes.answer, solution: obj.attributes.solution};
      });
      this._questions.next(questions);
      let deadlineISO: string;
      if(data.attributes.deadline){
        deadlineISO = data.attributes.deadline.substring(0,data.attributes.deadline.length-1);
      }
      return {id: data.id, title: data.attributes.title,
         description: data.attributes.description, published: data.attributes.published,
         deadline: deadlineISO};
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  updateQuestion(courseId: number, sectionId: number, taskId: number, question: Question) :Observable<any> {
    let editQuestionUrl: string = `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${sectionId}/tasks/${taskId}/questions/${question.id}`;
    let body = {data:{attributes: question}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.patch(editQuestionUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      // remember to send answer and solution from rails
      let question: Question = {
          id: data.id,
          text: data.attributes.text,
          answer_type: data.attributes.answer_type,
          answer: data.attributes.answer,
          solution: data.attributes.solution
        };
        this._questions.next(this._questions.getValue().map((oldQuestion) => {
          if(oldQuestion.id === question.id) {
            return question;
          } else return oldQuestion;
        }));
        return question;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  addQuestion(courseId: number, sectionId: number, taskId: number, question: any) :Observable<any> {
    let addQuestionUrl: string = `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${sectionId}/tasks/${taskId}/questions`;
    let body = {data:{attributes: question}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(addQuestionUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      // remember to send answer and solution from rails
      let question: Question = {
        id: data.id,
        text: data.attributes.text,
        answer_type: data.attributes.answer_type,
        answer: data.attributes.answer,
        solution: data.attributes.solution
        };
      this._questions.next(this._questions.getValue().concat(question));
      return question;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deleteQuestion(courseId: number, sectionId: number, taskId: number, question : Question) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses/${courseId}/sections/${sectionId}/tasks/${taskId}/questions/${question.id}`;
    return this.authHttp.delete(url)
    .map((res: Response) => {
      this._questions.next(this._questions.getValue().filter(ques => ques.id !== question.id));
      return question;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }
}
