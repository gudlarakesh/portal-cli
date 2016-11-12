import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Role } from '../models/index';
import { User } from '../../shared/models/user';
import { CohortRolesService } from '../services/cohort-roles.service';

@Component ({
  selector: 'ca-cohort-detail',
  templateUrl: 'cohort-details.component.html',
  styleUrls: ['cohort-details.component.css']
})

export class CohortDetailsComponent implements OnInit {
  cohortId: number;
  course:any = {
    tag_names: []
  };
  roles:Role[];
  allUsers : User[];
  allUsersWithRoles: string[] = [];
  allUsersWithOutRoles: string[] = [];
  allCohortManagers: any;
  allCohortManagersArray: any = [];
  allCohortMembers: any;
  allCohortMembersArray: any = [];
  constructor(
              private activatedRoute: ActivatedRoute,
              private cohortRolesService: CohortRolesService ) {
    this.roles = [{
      label : 'Cohort Managers',
      value : 'cohort_managers',
      id : 1
    }
    ];
  }

  ngOnInit() {
    this.cohortId = +this.activatedRoute.snapshot.params['id'];
    this.cohortRolesService.loadAllUsers()
    .subscribe(users => {
      this.allUsers = users;
      this.allUsersWithOutRoles = this.allUsers
      .filter(user => user.roles.length === 0)
      .map(user => user.email)
      console.log(this.allUsersWithOutRoles);
      this.allUsersWithRoles = this.allUsers
      .filter(user => user.roles.length > 0)
      .map(user => user.email)
      // *****--might use it at later part of development--*****
      // this.roles.forEach(role => {
      //   role.availableUsers = this.cohortRolesService.loadUsersByRole(role.value, this.allUsers);
      // });
    });

    this.getCohortRoles();
    this.getCohortMembers();
  }

  getUserId(userName: string, data: User[]) {
    return data.find(user => userName === user.email);
  }

  getCohortRoles() {
    this.cohortRolesService.getAssignedManagers(this.cohortId).subscribe(
    response => {
      this.allCohortManagers = response;
      if(this.allCohortManagers){
        this.allCohortManagersArray = this.allCohortManagers.map((item:any) => item['email']
          );
      }
      return response.email;
    })
  };

  addUserToRole(userName:string) {
    let userId: User = this.getUserId(userName,this.allUsers);
    this.cohortRolesService.postCohortManager(this.cohortId, userId.id).subscribe()
  }

  removeUserFromRole(userName:string) {
   let userId: User = this.getUserId(userName,this.allUsers);
    this.cohortRolesService.deleteCohortManager(this.cohortId, userId.id).subscribe()
  }

  getCohortMembers() {
    this.cohortRolesService.getAssignedMembers(this.cohortId).subscribe(
    response => {
      this.allCohortMembers = response;
      if(this.allCohortMembers){
        this.allCohortMembersArray = this.allCohortMembers.map((item:any) => item['email']
          );
      }
      return response.email;
    })
  };

  addMemberToRole(userName:string) {
    let userId: User = this.getUserId(userName,this.allUsers);
    this.cohortRolesService.postCohortMember(this.cohortId, userId.id).subscribe()
  }

  removeMemberFromRole(userName:string) {
   let userId: User = this.getUserId(userName,this.allUsers);
    this.cohortRolesService.deleteCohortMember(this.cohortId, userId.id).subscribe()
  }
};
