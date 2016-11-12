import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
declare var jQuery:any;

import { Cohort } from '../models/index';
import { CohortListService } from '../services/index';

@Component({
  selector: 'ca-cohort-list',
  templateUrl: 'cohort-list.component.html',
  styleUrls: ['cohort-list.component.scss']
})

export class CohortListComponent implements OnInit {
  allCohorts: Cohort[];
  newCohortName: string;
  updatedCohortName: string;
  formName: string;
  constructor(private notificationService: NotificationsService,
    private cohortlistservice: CohortListService, private router: Router) {
    this.formName = 'Cohort';
  }

  ngOnInit() {
    this.cohortlistservice.loadCohorts().subscribe(
      cohorts => {this.allCohorts = cohorts;
      this.notificationService.success('Success', 'All Cohorts Loaded Successfully');
      });
  }

  showCohortDetail(id:number) {
    this.router.navigate([`cohorts/${id}`]);
  }

  addNewCohort(cohortName:string) {
    this.cohortlistservice.postSubmitCohort(cohortName).subscribe(
      newCohort => {
      this.notificationService.success('Success', 'Created New Cohort');
    },err => {
      this.notificationService.error('Error', `${err.errors[0]}`);
    });
  };

  updateCohort(keyCode: any,id: number) {
    if(keyCode === 13) {
      event.preventDefault();
      var title: string = jQuery('#'+id)[0].innerHTML;
      this.cohortlistservice.updateChapter(id,title).subscribe(response => {
        this.notificationService.success('Success', 'Update Successful');}
        );
    }
  }

  deleteCohort(id: number) {
    this.cohortlistservice.deleteCohort(id).subscribe(
      delCohort => {
      this.notificationService.success('Success', 'Deleted Successfully');
      });
  }
}
