import { Component, Input, Output, EventEmitter,ViewEncapsulation } from '@angular/core';

import { Question } from '../models/question';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'ca-task-question',
  templateUrl: 'task-question.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskQuestionComponent {
  @Input() question: Question;
  @Input() canAddQuestion: boolean;
  @Output() saveQuestion = new EventEmitter<Question>();
  @Output() deleteQuestion = new EventEmitter<Question>();
  isEditableQuestion:boolean=false;

  constructor(
    private notificationService: NotificationsService) { }

  updateQuestion(question:Question) {
    this.saveQuestion.emit(question);
  }

  destroyQuestion(question: Question) {
    this.deleteQuestion.emit(question);
  }
}
