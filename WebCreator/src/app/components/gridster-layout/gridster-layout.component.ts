import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DesignService} from "../../services/design.service";
import {IComponent, LayoutService} from "../../services/layout.service";
import {WebElement} from "../../models/Element";
import {GridsterConfig, GridsterItem} from "angular-gridster2";

@Component({
  selector: 'app-gridster-layout',
  templateUrl: './gridster-layout.component.html',
  styleUrls: ['./gridster-layout.component.scss']
})
export class GridsterLayoutComponent implements OnInit, AfterViewChecked {
  height = 0;

  constructor(public designService: DesignService, public layoutService: LayoutService,
              private cdRef: ChangeDetectorRef) {

  }


  ngOnInit(): void {
    setTimeout(() => {

      console.log(this.height);
    }, 5);

  }

  ngAfterViewChecked(): void {

    this.cdRef.detectChanges();
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


}
