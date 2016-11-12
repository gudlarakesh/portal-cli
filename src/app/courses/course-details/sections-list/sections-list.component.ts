import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Section, Course } from '../../index';
import { NotificationsService } from 'angular2-notifications';
import { CourseDetailsService } from '../../services/course-details.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'ca-sections-list',
  templateUrl: 'sections-list.component.html',
  styleUrls: ['sections-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionsListComponent implements OnInit {
  sections:Section[];
  section:Section={title:''};
  showNewInput:boolean = false;
  courseId: any;
  paramsSubscription: any;
  course: Course;
  courseEditButtonClicked: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationsService,
    private courseService: CoursesService,
    private courseDetailsService: CourseDetailsService) { }

  ngOnInit() {
    this.courseId = +this.activatedRoute.snapshot.params['id'];
    this.courseService.loadCourseDetail(this.courseId)
    .subscribe(course => this.course = course);

    this.courseDetailsService.loadSections(this.courseId)
    .subscribe((sections) => {
      this.sections = sections;
    });
  }

  deleteSection(section: Section) {
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

  showNewForm() {
    this.showNewInput = true;
    this.section= {title:''};
  }

  addSection(section:Section) {
    this.courseDetailsService.addSection(this.courseId, section)
    .subscribe(section => {
        this.showNewInput = false;
        this.notificationService.success('Success',
        `You have successfully created the section: ${section.title}`);
      },
      (err:any) => {
        this.notificationService.error('Error', `${err.errors[0]}`);
      });
  }

  updateCourse() {
    this.courseService.updateCourse(this.course)
    .subscribe(course => {
      this.notificationService.success('Success',
          `You have successfully updated the course details`);
    }, err => {
     this.notificationService.error('Error',
        `${err.errors[0]}`);
    });
  }
}
