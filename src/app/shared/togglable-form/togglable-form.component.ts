import { Component, EventEmitter, Output, Input } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'ca-togglable-form',
  templateUrl: 'togglable-form.component.html',
  styleUrls: ['togglable-form.component.scss']
})
export class TogglableFormComponent {
  name:string;
  @Input() formFor: string;
  @Output() onSubmit = new EventEmitter();
  formOpen:boolean = false;
  newCardName:string = '';

  constructor() {
  }

  onFormSubmit() {
    this.onSubmit.emit(this.name);
    this.name = '';
    let frm = jQuery('form');
    frm.animate({
      width: '-=200'
    }, 1000, function() {
      frm.removeClass('active');
    });
  }

  actOnButtonClick() {
    let frm = jQuery('form');
    if (frm.hasClass('active')) {
      frm.animate({
        width: '-=200'
      }, 1000, function() {
      // Animation complete.
        frm.removeClass('active');
      });
    } else {
      frm.animate({
        width: '+=200'
      }, 1000, function() {
        // Animation complete.
        frm.addClass('active');
      });
    }
  }

}
