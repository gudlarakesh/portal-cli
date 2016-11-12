import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ca-editable-form',
  templateUrl: 'editable-form.component.html',
  styleUrls: ['editable-form.component.scss']
})

export class EditableFormComponent {
  @Output() onUpdate = new EventEmitter();
  isEditMode:boolean = false;

  constructor() {

  }

  onUpdateClick() {
    this.onUpdate.emit(true);
    this.isEditMode = false;
  }
}

@Component({
  selector: 'ca-editable-form-content',
  template: '<ng-content></ng-content>'
})

export class EditableFormContentComponent {

}

@Component({
  selector: 'ca-editable-form-read-only',
  template: '<ng-content></ng-content>'
})

export class EditableFormReadOnlyComponent {

}
