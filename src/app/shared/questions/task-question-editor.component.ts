import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { Question } from '../models/question';


@Component({
  selector: 'ca-task-question-editor',
  templateUrl: 'task-question-editor.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskQuestionEditorComponent implements OnInit {
  @Input() question: Question;
  @Input() canAddQuestion: boolean;
  @Output() showEditor = new EventEmitter<boolean>();
  @Output() saveQuestion = new EventEmitter<Question>();
  questionClone:Question;

  constructor() {}

  ngOnInit() {
   this.questionClone = Object.assign({},this.question);
  }

 submitQuestion() {
   this.saveQuestion.emit(this.questionClone);
 }

  clearEditor() {
    this.showEditor.emit(false);
  }
}
