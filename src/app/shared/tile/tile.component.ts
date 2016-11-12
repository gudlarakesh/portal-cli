import { Component, Input } from '@angular/core';

@Component({
  selector: 'ca-tile',
  templateUrl: 'tile.component.html'
})
export class TileComponent {
 @Input() path:string;

  constructor() {}
}
