import {Component, Input, OnInit} from '@angular/core';
import {DesignService} from "../../services/design.service";
import {IComponent, LayoutService} from "../../services/layout.service";
import {WebElement} from "../../models/Element";
import {GridsterConfig, GridsterItem} from "angular-gridster2";
import {LayoutItemDirective} from "../../directives/layout-item.directive";
import {SocialsService} from "../../services/socials.service";
import {Social} from "../../models/Socials";


@Component({
  selector: 'app-edit-tool-bar',
  templateUrl: './edit-tool-bar.component.html',
  styleUrls: ['./edit-tool-bar.component.scss']
})
export class EditToolBarComponent implements OnInit {
  socials: Social[] = [];

  constructor(public designService: DesignService, public layoutService: LayoutService, private socialsService: SocialsService) {
  }

  socialNames = ['facebook', 'twitter', 'vk', 'linkedin', 'instagram', 'soundcloud'];
  gifNames = [];

  ngOnInit(): void {
    this.socialsService.getAllSocials().subscribe((socials: Social[]) => {
      this.socials = socials;
    }, err => {
      console.log = (err);
    });

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

}
