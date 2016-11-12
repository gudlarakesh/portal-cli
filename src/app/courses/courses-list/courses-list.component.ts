import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { CoursesService } from '../services/courses.service' ;
import { Course } from '../models/course';

@Component({
  selector: 'ca-courses-list',
  templateUrl: 'courses-list.component.html',
  styleUrls: ['courses-list.component.css']
})

export class CoursesListComponent implements OnInit {
  formName: string;
  // deadline: Date;
  constructor(private router: Router, private notificationService: NotificationsService
    , private coursesService: CoursesService) {
    this.formName = 'Course';
  }

  ngOnInit() {
    this.coursesService.loadCourses()
    .subscribe();
  }

  showCourseDetail(id:number) {
    this.router.navigate([`/courses/${id}/sections`]);
  }

  addCourse(courseName:string) {
    let course:Course = new Course();
    course.title = courseName;
    this.coursesService.addCourse(course).subscribe(course => {
      this.notificationService.success('Success',
        'Added successfully');
    }, err => {
     this.notificationService.error('Error',
        `${err.errors[0]}`);
    });
  }

  deleteCourse(id:number) {
    this.coursesService.deleteCourse(id)
    .subscribe(res => {
      this.notificationService.success('Success',
        'Deleted successfully');
    }, err => {
     this.notificationService.error('Error',
        `${err.errors[0]}`);
    });
  }

  addTag(tag: string, course: Course) {
    if (!course.tag_names) course.tag_names = [];
    course.tag_names.push(tag);
    this.coursesService.updateCourse(course)
    .subscribe();
  }

  removeTag(tag: string, course: Course) {
    let index = course.tag_names.indexOf(tag);
    course.tag_names.splice(index, 1);
    this.coursesService.updateCourse(course)
    .subscribe();
  }
}
