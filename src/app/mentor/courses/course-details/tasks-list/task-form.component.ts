import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

import { Task } from '../../models/index';

import { NotificationsService } from 'angular2-notifications';
import { CourseDetailsService } from '../../services/index';

@Component({
  selector: 'ca-task-form',
  templateUrl: 'task-form.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task;
  @Output() showForm = new EventEmitter<boolean>();
  @Output() saveTask = new EventEmitter<Task>();
  taskClone:Task;

  constructor(private courseDetailsService : CourseDetailsService,
              private notificationService: NotificationsService) { }

  clearForm() {
    this.showForm.emit(false);
  }

  ngOnInit() {
    this.taskClone = Object.assign({},this.task);
  }

  submitTask() {
    this.saveTask.emit(this.taskClone);
  }
}
