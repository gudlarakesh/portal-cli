import { Directive, ElementRef, Input, Renderer, OnInit} from '@angular/core';

@Directive({ selector: '[caTaskStatusHighlighter]' })
export class TaskStatusHighlighterDirective implements OnInit {
  @Input('caTaskStatusHighlighter') task: any;

    constructor(private el: ElementRef, private renderer: Renderer) {}

    ngOnInit(){
      let classToAdd:string;
      if(!this.task.submissionId) {
        classToAdd = (new Date() > new Date(this.task.attributes.deadline)) ? 'bs-callout-danger' : 'bs-callout-default';
      } else {
        switch(this.task.attributes.status) {
          case 'submitted':
            classToAdd = 'bs-callout-info';
            break;
          case 'rejected':
            classToAdd = 'bs-callout-warning';
            break;
          case 'accepted':
            classToAdd = 'bs-callout-success';
            break;
          default :
            classToAdd = '';
        }
      }
      this.renderer.setElementClass(this.el.nativeElement, classToAdd, true);
    }
}
