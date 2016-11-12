import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Section } from '../../index';

import { CourseDetailsService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'ca-section',
  templateUrl: 'section.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent {
  @Input() section: Section;
  @Input() courseId: number;
  isEditableSection:boolean = false;

  constructor(
    private notificationService: NotificationsService,
    private courseDetailsService: CourseDetailsService) { }

  deleteSection(section:Section) {
    this.courseDetailsService.deleteSection(this.courseId, section)
    .subscribe(
      (section) => {
        this.notificationService.success('Success',
          `You have successfully deleted the chapter: ${section.title}`);
      },
      (err:any) => {
        this.notificationService.error('Error', `${err.errors[0]}`);
    });
  }

  updateSection(section:Section) {
    this.courseDetailsService.updateSection(this.courseId, section)
      .subscribe(
        section => {
          this.isEditableSection = false;
          this.notificationService.success('Success',
          `You have successfully edited the section: ${section.title}`);
        },
        (err:any) => {
          this.notificationService.error('Error', `${err.errors[0]}`);
     });
   }
}
