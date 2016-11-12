import { Component, Input, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

import { Section } from '../../models/section';

import { NotificationsService } from 'angular2-notifications';
import {CourseDetailsService} from '../../services/index';

@Component({
  selector: 'ca-section-form',
  templateUrl: 'section-form.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SectionFormComponent implements OnInit {
  @Input() section: Section;
  @Output() showForm = new EventEmitter<boolean>();
  @Output() saveSection = new EventEmitter<Section>();
  sectionClone:Section;

  constructor(private courseDetailsService : CourseDetailsService,
              private notificationService: NotificationsService) { }

  clearForm() {
    this.showForm.emit(false);
  }

  ngOnInit() {
    this.sectionClone = Object.assign({}, this.section);
  }

  submitSection() {
      this.saveSection.emit(this.sectionClone);
  }
}
