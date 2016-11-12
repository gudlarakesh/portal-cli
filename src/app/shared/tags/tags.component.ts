import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ca-tag-it',
  templateUrl: 'tags.component.html',
})

export class TagsComponent {
  @Input() tags : string[];
  @Input() tagsList : string[];
  @Input() readOnly: boolean;
  @Input() onlyFromAutoComplete: boolean;
  @Output() onRemove = new EventEmitter();
  @Output() onAdd = new EventEmitter();

  constructor() {}

  onItemRemoved(event: any) {
    this.onRemove.emit(event);
  }

  onItemAdded(event: any) {
    this.onAdd.emit(event);
  }
}
