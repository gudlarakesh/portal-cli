import { Component, OnInit } from '@angular/core';
import { UsersService } from '../index';
// import { StringUtils } from '../../shared/index';

@Component({
  selector: 'ca-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  allRoles = ['admin', 'curriculum_editor' ];
  StringUtils: any;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.loadUsers()
    .subscribe((users: any[]) => true);
    // this.StringUtils = StringUtils;
  }

  changeRole(event: any, user: any, role: string) {
    if(event.checked) {
      this.usersService.addRole(user, role)
      .subscribe((updatedUser) => true);
    } else {
      this.usersService.deleteRole(user, role)
      .subscribe((updatedUser) => true);
    }
  }
}
