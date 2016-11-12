import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/index';

declare var jQuery:any;

@Component({
  selector: 'ca-student-task-list',
  templateUrl: 'student-task-list.component.html',
  styleUrls: ['student-task-list.component.scss']
})

export class StudentTaskListComponent {
  @Input() taskList: Observable<Task[]>;
  @Output() onTaskSelect = new EventEmitter<Task>();

  constructor() { }

  cardClicked(task:Task) {
    // TODO: Rewrite code without using jQuery directly
    jQuery('.card-highlighter').removeClass('selected');
    jQuery('#taskList_' + task.id).addClass('selected');
    this.onTaskSelect.emit(task);
  }
}
