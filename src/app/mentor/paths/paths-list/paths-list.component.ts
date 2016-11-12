import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
declare var jQuery:any;

import { PathsService } from '../services/index' ;
import { Path } from '../models/index';

@Component({
  selector: 'ca-paths-list',
  templateUrl: 'paths-list.component.html',
  styleUrls: ['paths-list.component.scss']
})

export class PathsListComponent implements OnInit {

  formName: string;
  cohortId: number;
  pathTitle: string;
  path: Path;
  pathDetails: Path;

  constructor(private router: Router, private notificationService: NotificationsService
    , private pathsService: PathsService, private activatedRoute: ActivatedRoute) {
    this.formName = 'Path';
  }

  ngOnInit() {
    this.cohortId = +this.activatedRoute.snapshot.params['id'];
    this.pathsService.loadPaths(this.cohortId)
        .subscribe(res => {
          this.pathDetails = res[0];
        });
  }

  showPathDetail(id:number) {
    this.router.navigate([`/path/${id}/courses`]);
  }

  addPath(pathName:string) {
    let path:Path = {};
    path.title = pathName;
    path.cohortId = this.cohortId
    this.pathsService.addPath(path).subscribe(path => {
      this.pathDetails = path
      this.notificationService.success('Success',
        'Added successfully');
    }, err => {
     this.notificationService.error('Error',
        `${err.errors[0]}`);
    });
  }

  updatePathName(keyCode: any,id: number) {
    let path: Path = {};
    path.id = id;
    path.cohortId = this.cohortId;
    if(keyCode === 13) {
      event.preventDefault();
      var title: string = jQuery('#'+id)[0].innerHTML;
      path.title = title;
      this.pathsService.updatePath(path).subscribe(response => {
        this.pathDetails = response;
        this.notificationService.success('Success', 'Update Successful');}
        );
    }
  }

  deletePath(path: Path) {
    this.pathsService.deletePath(path)
    .subscribe(res => {
      this.notificationService.success('Success',
        'Deleted successfully');
    }, err => {
     this.notificationService.error('Error',
        `${err.errors[0]}`);
    });
  }

}
