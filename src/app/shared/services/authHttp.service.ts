import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Request, RequestOptionsArgs, Response, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CurrentUserService } from './current-user.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class AuthHttpService {

  // private etags: Cache = new Cache({ max_size: 50 });

  constructor(private http: Http, private router: Router,
    private currentUserService: CurrentUserService,
    private notificationService: NotificationsService
  ) {}

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let req: Request;
    if (typeof url === 'string') {
      let reqOpt = new RequestOptions(options);
      reqOpt.url = url;
      req = new Request(reqOpt);
    }else {
      req = url;
    }

    this._beforeCall(req);

    return this.http.request(req)
      .do((res:Response) => {
        this._afterCall(req, res);
      }, (err: Response) => {
        if(err.status === 401) {
          this.currentUserService.removeCurrentUser();
          this.notificationService.error('Session TimeOut', 'Please login again.');
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.notificationService.error('Forbidden', 'You are not authorized to access this route.');
        }
      });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Get, url, options);
    return this.request(url, opts);
  }
  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Post, url, options, body);
    return this.request(url, opts);
  }
  put(url: string,  body: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Put, url, options, body);
    return this.request(url, opts);
  }
  patch(url: string,  body: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Patch, url, options, body);
    return this.request(url, opts);
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Delete, url, options);
    return this.request(url, opts);
  }

  private appendAuthorizationHeaders(req: Request) : void {

    let authHeaders = JSON.parse(localStorage.getItem('authStoredHeaders'));

    for(let key in authHeaders) {
      req.headers.append(key, authHeaders[key]);
    }
  }

  private _beforeCall(req: Request): void {
    this.appendAuthorizationHeaders(req);
  }

  private _afterCall(req: Request, res: Response) {

    if(res.status === 401) {
      this.router.navigate(['/login']);
      return;
    }

    let authHeaders = res.headers;

    if(localStorage.getItem('authStoredHeaders')) {
      var authStoredHeaders: any = JSON.parse(localStorage.getItem('authStoredHeaders'));
    } else {
      var authStoredHeaders:any = {};
    }

    if( this.ifCompleteHeaders(authHeaders) && this.ifNewer(authHeaders, authStoredHeaders)) {

      authStoredHeaders['access-token'] = authHeaders.get('access-token');
      authStoredHeaders['client'] = authHeaders.get('client');
      authStoredHeaders['expiry'] = authHeaders.get('expiry');
      authStoredHeaders['token-type'] = 'Bearer';
      authStoredHeaders['uid'] = authHeaders.get('uid');

      localStorage.setItem('authStoredHeaders', JSON.stringify(authStoredHeaders));
    }
  }

  private ifCompleteHeaders(authHeaders: any) :boolean {
    if (
          authHeaders.get('access-token') !== null &&
          authHeaders.get('client') !== null &&
          authHeaders.get('expiry') !== null &&
          authHeaders.get('token-type') !== null &&
          authHeaders.get('uid') !== null
      ) {
          return true;
      } else {
          return false;
      }
  }

  private ifNewer(authHeaders: any, prevAuthHeaders: any): boolean {
    if (prevAuthHeaders !== null && prevAuthHeaders.expiry ) {
      return authHeaders.get('expiry') >= prevAuthHeaders.expiry;
    } else {
      return true;
    }
  }

  private _build(method: RequestMethod, url: string, options: RequestOptionsArgs, body?: string): RequestOptionsArgs {
    let aBody = body ? body : options && options.body ? options.body : undefined;
    let opts: RequestOptionsArgs = {
      method: method,
      url: url,
      headers: options && options.headers ? options.headers : new Headers(),
      search: options && options.search ? options.search : undefined,
      body: aBody
    };
    return opts;
  }
}
