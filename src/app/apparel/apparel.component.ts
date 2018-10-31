import { Component, OnInit, Input } from '@angular/core';
import { Apparel } from './apparel.model';

@Component({
  selector: 'app-apparel',
  templateUrl: './apparel.component.html',
  styles: []
})
export class ApparelComponent implements OnInit {

  @Input() itemElement: Apparel;

  constructor() { }

  ngOnInit() {
  }

}
