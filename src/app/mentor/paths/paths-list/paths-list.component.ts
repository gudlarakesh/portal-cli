import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { PathsService } from '../services/index' ;
import { Path } from '../models/index';

@Component({
  selector: 'ca-paths-list',
  templateUrl: 'paths-list.component.html',
  styleUrls: ['paths-list.component.scss']
})

export class PathsListComponent implements OnInit {
  formName: string;

  constructor(private router: Router, private notificationService: NotificationsService
    , private pathsService: PathsService) {
    this.formName = 'Path';
  }

  ngOnInit() {
      this.pathsService.loadPaths()
        .subscribe();
  }

  showPathDetail(id:number) {
    this.router.navigate([`/path/${id}/courses`]);
  }

  addPath(pathName:string) {
    let path:Path = {};
    path.title = pathName;
    this.pathsService.addPath(path).subscribe(path => {
      this.notificationService.success('Success',
        'Added successfully');
    }, err => {
     this.notificationService.error('Error',
        `${err.errors[0]}`);
    });
  }

  deletePath(id:number) {
    this.pathsService.deletePath(id)
    .subscribe(res => {
      this.notificationService.success('Success',
        'Deleted successfully');
    }, err => {
     this.notificationService.error('Error',
        `${err.errors[0]}`);
    });
  }

}
