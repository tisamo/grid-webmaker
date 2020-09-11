import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mat-button',
  templateUrl: './mat-button.component.html',
  styleUrls: ['./mat-button.component.scss']
})
export class MatButtonComponent implements OnInit {
  @Input()
  icon = '';

  @Input()
  card = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
