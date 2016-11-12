import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'taskSubmissionsFilter'
})
@Injectable()

export class TaskSubmissionsFilter implements PipeTransform {
  transform(arr: any[], str: string) {
    let arrNew:any[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].status === str) {
        arrNew.push(arr[i]);
      }
    }
    return arrNew;
  }
}
