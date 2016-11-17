import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { Task } from '../models/task';
import { StudentTaskService } from '../services/index' ;

@Component({
  selector: 'ca-student-task-description',
  templateUrl: './student-task-description.component.html',
  styleUrls: ['student-task-description.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class StudentTaskDescriptionComponent implements OnInit {
  @Input() readOnly:boolean = false;
  canAddQuestion: boolean = false;
  allAnswersSubmitted: boolean = false;
  task:Task;
  questions: any;
  constructor(private taskService: StudentTaskService, private router: Router,
   private activatedRoute: ActivatedRoute, private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: { taskDetail: any }) => {
    this.task = data.taskDetail;
    let detailData:any = this.taskService.getAllDetailsOfTask(this.task);
    this.questions = detailData.questions;
    this.task.submissionId = detailData.submissionId;
    this.task.status = detailData.status;
  });
    this.taskService.questions
    .subscribe(ques => {
      let answeredQuestions = ques.filter((question:any) => question.answerId).length;
      if (answeredQuestions === this.questions.length) {
        this.allAnswersSubmitted = true;
      }else {
        this.allAnswersSubmitted = false;
      }
    });
  }

  markComplete() {
    if (this.task.submissionId) {
      this.taskService.resubmitTask(this.task).subscribe(task => {
        this.task.attributes.isDone = true;
      });
    } else {
      this.taskService.submitTask(this.task).subscribe(task => {
        this.task.submissionId = task.id;
        this.task.attributes.isDone = true;
      });
    }
    // Navigate to the Under Review Tab once marked as completed
    let navigationExtras: NavigationExtras = {
      queryParams: { 'type': 2},
    };
    this.router.navigate(['/tasks'], navigationExtras);
    this.notificationService.success('Nice Job !!',
         `Submitted the task for review`);
  }


  submitResponse(response:any) {
    if (response.answerId) {
      this.taskService.updateAnswer(this.task, response)
      .subscribe(task => {
        this.notificationService.success('Success',
               `successfully updated the answer`);
      },(err) => {
        this.notificationService.error('Error', 'Unable to update the answer');
        console.log(err.errors[0]);
      });
    } else {
      this.taskService.postAnswer(this.task, response)
      .subscribe(task => {
        this.notificationService.success('Success',
               `successfully posted the answer`);
      }, (err) => {
        this.notificationService.error('Error', 'Unable to post the answer');
        console.log(err.errors[0]);
      });
    }
  }
}
