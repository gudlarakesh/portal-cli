import { Injectable, Inject } from '@angular/core';
import { Response , Headers, RequestOptions} from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Path } from '../models/index';

import { AuthHttpService } from '../../../shared/services/authHttp.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Injectable()
export class PathsService {
  public pathsObs: Observable<Path[]>;
  private _paths: BehaviorSubject<Path[]>;

  constructor(private authHttp: AuthHttpService, private errorHandlerService: ErrorHandlerService,
              @Inject('config') private config:any) {
    this._paths = new BehaviorSubject([]);
    this.pathsObs = this._paths.asObservable();
  }

  addPath(path: Path) :Observable<any> {
    let url: string = `${this.config.dev.apiUrl}/organization_curriculum/paths`;
    let body = {data:{attributes: path}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(url, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let path: Path = {
        id: data.id,
        title: data.attributes.title
      };
      this._paths.next(this._paths.getValue().concat(path));
      return path;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  updatePath(path: Path) :Observable<any> {
    let editPathUrl: string = `${this.config.dev.apiUrl}/organization_curriculum/paths/${path.id}`;
    let body = {data:{attributes: path}};
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.patch(editPathUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let data = res.json().data;
      let path: Path = {
        id: data.id,
        title: data.attributes.title
      };
      this._paths.next(this._paths.getValue().map((oldPath) => {
        if(oldPath.id === path.id) {
          return path;
        } else return oldPath;
      }));
      return path;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  loadPaths() :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/courses`;

    return this.authHttp.get(url)
    .map((res: Response) => {
      let paths: Path[] = res.json().data.map((obj: any) => {
        return {id: obj.id, title: obj.attributes.title};
      });
      this._paths.next(paths);
      return paths;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  deletePath(id: number) :Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/paths/${id}`;
    return this.authHttp.delete(url)
    .map((res: Response) => {
      this._paths.next(this._paths.getValue().filter(chap => chap.id !== id));
      return true;
    })
    .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }

  loadPathDetail(id:number):Observable<any> {
    let url: string =  `${this.config.dev.apiUrl}/organization_curriculum/paths/${id}`;
    return this.authHttp.get(url)
    .map((res: Response) => {
      let rsp = res.json().data;
      return {id: rsp.id, title: rsp.attributes.title};
    })
   .catch((error:any) => {
      let errObj = this.errorHandlerService.handleError(error);
      return Observable.throw(errObj);
    });
  }
}
