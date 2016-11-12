import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {
  handleError(err: any): Object {
    if (err.status >= 500 && err.json) {
      return {errors: [err.json().error]};
    } else if (err && err.json) {
      return {errors: err.json().errors, status: err.status};
    } else {
      return {errors: ['Server error']};
    }
  }
}