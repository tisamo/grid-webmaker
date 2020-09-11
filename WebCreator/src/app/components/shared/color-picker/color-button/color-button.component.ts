import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ColorPickerComponent} from "../color-picker.component";
import {DesignService} from "../../../../services/design.service";
import {WebElement} from "../../../../models/Element";

@Component({
  selector: 'app-color-button',
  templateUrl: './color-button.component.html',
  styleUrls: ['./color-button.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class ColorButtonComponent implements OnInit {
  @Output() colorEmitter = new EventEmitter();
  @Input() mode = '';
  @Input() colorMode = '';
  @Input() icon = '';
  isMobile = false;
  width = window.innerWidth;
  height = window.innerHeight;
  mobileWidth = 760;
  constructor(private dialog: MatDialog, public designService: DesignService) {
  }



  ngOnInit(): void {
  }

  openPalette() {
    const dialogRef = this.dialog.open(ColorPickerComponent, {
      height: (this.height / 1.5).toString() + 'px',
      width: (this.width / 2).toString() + 'px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.modeSelect(this.mode, result);
    });
  }

  modeSelect(mode: string, result) {
    switch (mode) {
      case 'header':
        let obj;
        if (this.colorMode === 'text') {
          this.designService.headerTextColor = result;
          obj = new WebElement(mode, '', result);
        } else {
          this.designService.headerColor = result;
          obj = new WebElement(mode, result, '');
        }
        this.designService.editSpecsForElement(obj).subscribe(x => {
        this.colorEmitter.emit(x);
        console.log(x);
        }, err => {

        });
        break;
      case'footer':

    }
  }

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.isMobile = this.width < this.mobileWidth;
  }

}
