import {Component, Input, OnInit} from '@angular/core';
import {DesignService} from "../../../../services/design.service";
import {MatDialog} from "@angular/material/dialog";
import {ColorPickerComponent} from "../../color-picker/color-picker.component";
import {MenuEditorPopupComponent} from "./menu-editor-popup/menu-editor-popup.component";
import {LayoutService} from "../../../../services/layout.service";

@Component({
  selector: 'app-menu-editor',
  templateUrl: './menu-editor.component.html',
  styleUrls: ['./menu-editor.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class MenuEditorComponent implements OnInit {
  @Input()
  icon = '';

  @Input()
  mode = '';

  width = window.innerWidth / 1.25;
  height = window.innerHeight / 1.25;

  constructor(public designService: DesignService,
              private dialog: MatDialog,
              private layout: LayoutService) {
  }

  ngOnInit(): void {
  }

  openEditor() {
    const dialogRef = this.dialog.open(MenuEditorPopupComponent, {
      width: this.width + 'px',
      height: this.height + 'px'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onWindowResize($event: any) {
    this.height = $event.target.innerHeight / 1.25;
    this.width = $event.target.innerWidth / 1.25;
  }
}
