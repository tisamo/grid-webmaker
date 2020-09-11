import {Component, OnInit} from '@angular/core';
import {DesignService} from "./services/design.service";
import {LayoutService} from "./services/layout.service";
import {SocialsService} from "./services/socials.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WebCreator';

  constructor(private designService: DesignService,
              private layoutService: LayoutService,
              private socialsService: SocialsService) {

  }

  ngOnInit(): void {
    this.getHeaderMenu();
    this.getColorSpecs();
    this.getSocials();
    this.getGifs();
  }

  getHeaderMenu() {
    this.designService.getHeaderMenuItems('header').subscribe(menu => {
      this.designService.headerMenu = menu;
    }, err => {
      console.log(err);
    });
    this.designService.getSpecsForElement('header').subscribe(x => {
      this.designService.headerColor = x.color;
      this.designService.headerTextColor = x.textColor;
      this.layoutService.height = x.height;
      this.layoutService.backGroundImage = x.backgroundImage;
      console.log('zsa', this.layoutService.height);
    }, err => {
      console.log(err);
    });
  }


  getColorSpecs() {

  }

  getSocials() {
    this.socialsService.getAllSocials().subscribe(sociasls => {
      this.socialsService.socials = sociasls;
    });
  }

  getGifs() {
    this.designService.getGifs().subscribe(gifs => {
      this.designService.gifs = gifs;
      this.designService.gifs.sort((a, b) => (a > b ? 1 : -1));
    });
  }


}
