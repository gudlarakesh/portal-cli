import { Component, ViewContainerRef, ViewEncapsulation } from '@angular/core';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  selector: 'ca-portal',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  viewContainerRef: ViewContainerRef;
  options: any;
  constructor(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;

    // default options for angular2-notifications
    this.options = {
      timeOut: 5000,
      lastOnBottom: true,
      clickToClose: true,
      maxLength: 0,
      maxStack: 7,
      showProgressBar: true,
      pauseOnHover: true
    };
  }
}
