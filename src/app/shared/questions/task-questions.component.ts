import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';

import { Question } from '../../courses/index';

@Component({
  selector: 'ca-task-questions',
  templateUrl: 'task-questions.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TaskQuestionsComponent implements  OnChanges {
  @Input() questions: Question[];
  @Input() showQstEditor:boolean;
  @Input() canAddQuestion:boolean;
  @Output() saveQuestion = new EventEmitter<Question>();
  @Output() deleteQuestion = new EventEmitter<Question>();
  question:Question={text:'',answer_type:'string',solution:'',answer:''};
  isEditableQuestion:boolean=false;

  constructor() {}

 ngOnChanges(changes:SimpleChanges) {
  if(changes['showQstEditor'] && changes['showQstEditor'].currentValue.value === false) {
    this.isEditableQuestion = false;
  }
 }

 addQuestion(question: Question) {
   this.saveQuestion.emit(question);
 }

 destroyQuestion(question:Question) {
    this.deleteQuestion.emit(question);
 }
}
