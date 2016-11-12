import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ca-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card-component.scss']
})
export class CardComponent {
  @Input() path:any;
  @Output() onClicked = new EventEmitter<any>();

  cardClick() {
    this.onClicked.emit(this);
  }
}
