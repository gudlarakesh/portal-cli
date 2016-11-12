import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-panel',
  templateUrl: 'panel.component.html'
})
export class PanelComponent {
  @Input() title:string;
}
