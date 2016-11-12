import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
declare var marked: any;
declare var hljs: any;

@Component({
  selector: 'ca-markdown-viewer',
  template: `<div [innerHTML]="htmlText"></div>`
})
export class MarkDownViewerComponent implements OnChanges {
  @Input() mdText: string;
  htmlText: any;
  md: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.md = marked.setOptions({
      highlight: function (code: any) {
        return hljs.highlightAuto(code).value;
      }
    });
    let unParsedText = changes['mdText'].currentValue || '';
    this.htmlText = this.md.parse(unParsedText);
  }

}
