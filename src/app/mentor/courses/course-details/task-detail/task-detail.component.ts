import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../../index';
import { Question } from '../../../../shared/models/question';
import { CourseDetailsService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'ca-task-detail',
  templateUrl: 'task-detail.component.html',
  styleUrls: ['task-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  taskId:number;
  oldTaskId:number;
  courseId:number;
  sectionId:number;
  task:Task[];
  paramsSubscription: any;
  isEditableTask:boolean=false;
  showQstEditor:any={value:false};
  canAddQuestion:boolean;
  canEditQuestionSubscription:any;
  questions: Question[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private courseDetailsService: CourseDetailsService,
    private notificationService: NotificationsService) {
  }

  ngOnInit() {

    let obs1 = this.activatedRoute.params;
    let obs2 = this.activatedRoute.parent.params;
    let obs3 = this.activatedRoute.parent.parent.params;

    this.canEditQuestionSubscription = this.activatedRoute.data.subscribe((v:any)=> {
      this.canAddQuestion =v.canAddQuestion;
    });

    this.paramsSubscription = obs3
    .flatMap((courseParams) => {
      return obs2.map((sectionParams) => {
        return {courseId: +courseParams['id'], sectionId: +sectionParams['id']};
      });
    })
    .flatMap((paramsObj:any) => {
      return obs1.map((taskParams:any) => {
        paramsObj['taskId'] = +taskParams['id'];
        return paramsObj;
      });
    });

    this.paramsSubscription.subscribe((obj: any) => {
      this.courseId = obj.courseId;
      this.sectionId = obj.sectionId;
      this.taskId = obj.taskId;
      if((this.oldTaskId !== obj.taskId)) {
        this.courseDetailsService.getTask(obj.courseId,obj.sectionId, obj.taskId)
        .subscribe((task:any)=> {
          this.task = [task];
          this.oldTaskId = obj.taskId;
        });
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.canEditQuestionSubscription.unsubscribe();
  }

  updateTask(task:Task) {
    this.courseDetailsService.updateTask(this.courseId, this.sectionId, task)
    .subscribe(task => {
          this.task=[task];
          this.isEditableTask = false;
          this.notificationService.success('Success',
          `You have successfully edited the task: ${task.title}`);
        },
        (err:any) => {
          this.notificationService.error('Error',`${err.errors[0]}`);
    });
  }

  deleteTask(task:Task) {
    this.courseDetailsService.deleteTask(this.courseId, this.sectionId, task)
    .subscribe(
        (task) => {
          this.task=[];
          this.notificationService.success('Success',
            `You have successfully deleted the task: ${task.title}`);
        },
        (err:any) => {
          this.notificationService.error('Error', `${err.errors[0]}`);
    });
  }

  saveQuestion(question:Question) {
    if(question.id) {
      this.courseDetailsService.updateQuestion(this.courseId, this.sectionId, this.taskId, question)
      .subscribe(question => {
          this.showQstEditor = {value: false};
          this.notificationService.success('Success',
          `successfully updated the question`);
        },
        (err:any) => {
          this.notificationService.error('Error', `${err.errors[0]}`);
        });
    } else {
      this.courseDetailsService.addQuestion(this.courseId,this.sectionId, this.taskId, question)
       .subscribe(question => {
           this.showQstEditor = {value: false};
           this.notificationService.success('Success',
           `Successfully created the question`);
         },
         (err:any) => {
           this.notificationService.error('Error', `${err.errors[0]}`);
         });
    }
  }

   deleteQuestion(question: Question) {
     this.courseDetailsService.deleteQuestion(this.courseId, this.sectionId, this.taskId, question)
     .subscribe(question => {
         this.notificationService.success('Success',
         `successfully deleted the question: ${question.id}`);
       },
       (err:any) => {
         this.notificationService.error('Error', `${err.errors[0]}`);
       });
   }
}
