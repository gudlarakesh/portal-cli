import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { StudentTaskService } from '../services/index';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'ca-student-task-container',
  templateUrl: './student-task-container.component.html',
  styleUrls: ['./student-task-container.component.css']
})

export class StudentTaskContainerComponent implements OnInit {

  completedTasks: Observable<Task[]> ;
  pendingTasks: Observable<Task[]> ;
  underReviewTasks: Observable<Task[]> ;
  rejectedTasks: Observable<Task[]> ;
  taskDetail: any;
  errorMessage: string;
  isTaskSelected: boolean = false;
  isPendingTasksPanelOpen: boolean = false;
  isCompletedTasksPanelOpen: boolean = false;
  currentTabType:string;
  selectedTabIndex:number;

  constructor(private router:Router, private taskService: StudentTaskService,
    private activatedRoute:ActivatedRoute) {
    this.selectedTabIndex = 0;
  }

  ngOnInit() {
    this.taskService.submittedTasksObs
    .subscribe(tasks => {
      this.completedTasks =  Observable.from(tasks)
      .filter(task => task.attributes.status === 'accepted')
      .toArray();
      this.underReviewTasks = Observable.from(tasks)
      .filter(task => task.attributes.status === 'submitted')
      .toArray();
      this.rejectedTasks = Observable.from(tasks)
      .filter(task => task.attributes.status === 'rejected')
      .toArray();
    });
    this.taskService.allTasksObs
    .subscribe(tasks => {
      this.pendingTasks =  Observable.from(tasks)
      .filter(task => !task.submissionId)
      .toArray();
    });

    this.selectedTabIndex = this.activatedRoute.snapshot.queryParams['type'];
    if (!this.selectedTabIndex) {
      this.selectedTabIndex = 0;
    }
  }

  taskSelected(task:Task) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'type': this.selectedTabIndex},
    };
    this.router.navigate(['/tasks', task.id], navigationExtras);
  }

  tabChanged(arg:any) {
    this.selectedTabIndex = arg.index;
    let navigationExtras: NavigationExtras = {
      queryParams: { 'type': arg.index },
    };
    this.router.navigate(['/tasks'], navigationExtras);
  }
}
