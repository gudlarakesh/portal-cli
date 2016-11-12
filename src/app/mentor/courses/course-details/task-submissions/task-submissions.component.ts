import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Question } from '../../models/question';
import { SubmissionsService } from '../../services/submissions.service';

@Component ({
  selector: 'ca-task-submissions',
  templateUrl: 'task-submissions.component.html'
})

export class TaskSubmissionsComponent implements OnChanges {
  @Input() taskId: number;
  submissions: any[] = [];
  statusFilter:string = 'submitted';
  questions: Question[];

  constructor(private submissionsService: SubmissionsService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.submissionsService.loadSubmissions(changes['taskId'].currentValue)
    .subscribe((submissions: any) => { return; });
  }
}
