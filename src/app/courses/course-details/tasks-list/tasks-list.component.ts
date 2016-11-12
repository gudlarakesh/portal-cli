import { Component,OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../../models/index';

import { NotificationsService } from 'angular2-notifications';
import { CourseDetailsService } from '../../services/index';

@Component({
  selector: 'ca-tasks-list',
  templateUrl: 'tasks-list.component.html',
  styleUrls: ['tasks-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksListComponent implements OnInit, OnDestroy {
  showNewInput:boolean = false;
  task: Task = {title:'', description:'', published: false, deadline: ''};

  paramsSubscription: any;
  planId:number;
  courseId:number;
  sectionId:number;
  oldSectionId:number;
  tasks:Task[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationsService,
    private courseDetailsService:CourseDetailsService) { }

  ngOnInit() {
    let obs1 = this.activatedRoute.params;
    let obs2 = this.activatedRoute.parent.params;

   this.paramsSubscription = obs2
   .flatMap((courseParams) => {
     return obs1.map((sectionParams) => {
       return {courseId: +courseParams['id'], sectionId: +sectionParams['id']};
     });
   });

   this.paramsSubscription.subscribe((obj:any) => {
     this.courseId = obj.courseId;
     this.sectionId = obj.sectionId;
     if((this.oldSectionId !== obj.sectionId)) {
       this.courseDetailsService.loadTasks(obj.courseId,obj.sectionId)
       .subscribe((tasks) => {
         this.tasks = tasks;
         this.oldSectionId = obj.sectionId;
       });
     }
   });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  showNewForm() {
    this.showNewInput = true;
    this.task= {title:'', description:'', published: false, deadline:''};
  }

  addTask(task:Task) {
    this.courseDetailsService.addTask(this.courseId, this.sectionId, task)
    .subscribe(
      task => {
        this.showNewInput = false;
        this.task = {title: '', description: '', published: false, deadline:''};
        this.notificationService.success('Success',
        `You have successfully created the task: ${task.title}`);
      },
      (err:any) => {
        this.notificationService.error('Error', `${err.errors[0]}`);
     });
  }
}
