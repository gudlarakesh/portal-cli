import { CONFIG } from './config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HomeModule } from './+home/home.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';

import { environment } from '../environments/environment';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes),
            HomeModule, LoginModule,
            SharedModule.forRoot(), SimpleNotificationsModule],
  declarations: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF,useValue: environment.baseUrl},{ provide: 'config',useValue: CONFIG}],
  bootstrap: [AppComponent]
})

export class AppModule { }
