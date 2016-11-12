import { Component, Input, OnInit } from '@angular/core';
import { SubmissionsService } from '../../services/submissions.service';

@Component ({
  selector: 'ca-task-submission',
  templateUrl: 'task-submission.component.html'
})

export class TaskSubmissionComponent implements OnInit {
  @Input() submission:any;
  @Input() taskId:any;

  constructor(private submissionsService: SubmissionsService) {}

  ngOnInit() { }

  approveSubmission() {
    this.submissionsService.updateSubmissionStatus(this.taskId, this.submission, 'accepted')
    .subscribe((obj) => {
      return;
    });
  }

  rejectSubmission() {
    this.submissionsService.updateSubmissionStatus(this.taskId, this.submission, 'rejected')
    .subscribe(() => {
      return;
    });
  }
}
