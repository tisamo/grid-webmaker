import {Component, OnInit} from '@angular/core';
import {WebElement} from "../../models/Element";
import {DesignService} from "../../services/design.service";
import {GridsterConfig, GridsterItem} from 'angular-gridster2';
import {IComponent, LayoutService} from "../../services/layout.service";
import {GridsterLayoutComponent} from "../gridster-layout/gridster-layout.component";
import {ColorPickerComponent} from "../shared/color-picker/color-picker.component";
import {MatDialog} from "@angular/material/dialog";
import {HeightComponent} from "../shared/forms/height/height.component";
import {SocialsComponent} from "../edit-tool-bar/socials/socials.component";
import {SocialManagerComponent} from "../edit-tool-bar/social-manager/social-manager.component";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class EditorComponent implements OnInit {
  editTool = false;
  isMobile = false;
  width = window.innerWidth;
  height = window.innerHeight;
  mobileWidth = 760;
  filtersLoaded: Promise<boolean>;
  editorDisabler = 'Enable editor elements';

  constructor(public designService: DesignService, public layoutService: LayoutService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.designService.getSpecsForElement('header').subscribe(x => {
    }, err => {
      console.log(err);
    });
    console.log('zsa', this.height);
    this.designService.getSpecsForElement('header').subscribe(x => {
      this.designService.headerColor = x.color;
      this.designService.headerTextColor = x.textColor;
      this.height = x.height;
      this.filtersLoaded = Promise.resolve(true);
      console.log('zsa', this.height);
    }, err => {
      console.log(err);
    });
  }

  showToolbar() {
    this.editTool = !this.editTool;
  }

  changeColor(design: WebElement) {

  }

  get options(): GridsterConfig {
    return this.layoutService.options;
  }

  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }

  get components(): IComponent[] {
    return this.layoutService.components;
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  editorSwtich() {
    this.layoutService.options.draggable.enabled = !this.layoutService.options.draggable.enabled;
    this.layoutService.options.resizable.enabled = !this.layoutService.options.resizable.enabled;
    this.designService.headerEdit = !this.designService.headerEdit;
    if (this.layoutService.bColor === 'grey') {
      this.layoutService.bColor = 'white';
    } else {
      this.layoutService.bColor = 'grey';
    }
    this.changedOptions();
  }

  openHeightOptions() {
    const dialogRef = this.dialog.open(HeightComponent, {
      height: 400 + 'px',
      width: (this.width / 1.5).toString() + 'px',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onWindowResize($event: any) {

  }


  disableEnableEditor() {
    if (this.editorDisabler === 'Enable editor elements') {
      this.editorDisabler = 'Disable editor elements';
    } else {
      this.editorDisabler = 'Enable editor elements';

    }
  }

  setSocials() {
    const dialogRef = this.dialog.open(SocialManagerComponent, {
      height: this.height + 'px',
      width: (this.width / 1.5).toString() + 'px',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
