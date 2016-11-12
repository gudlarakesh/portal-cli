import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { CurrentUserService } from '../../shared/index';
import { User } from '../../shared/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthHttpService } from '../../shared/index';


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  currentUser: User;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public authHttp: AuthHttpService, public http: Http, public currentUserService: CurrentUserService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
    this.currentUser = this.currentUserService.currentUser
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
