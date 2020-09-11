import {Component, OnInit} from '@angular/core';
import {DesignService} from "../../services/design.service";
import {CdkDragDrop, CdkDragSortEvent, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {WebElement} from "../../models/Element";
import {MenuItem} from "../../models/MenuItem";
import {LayoutService} from "../../services/layout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  backGroundColor = '';
  textColor = '';
  title = 'webofweb';
  menu: MenuItem[] = [];


  constructor(public designService: DesignService, public layoutService: LayoutService, private router: Router) {
  }

  navigate(path) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.designService.getSpecsForElement('header').subscribe(header => {
      this.designService.headerColor = header.color;
      this.designService.headerTextColor = header.textColor;
    }, err => {
      console.log('vége mindennek');
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      console.log(this.menu);
      const name0 = this.designService.headerMenu[event.previousIndex].name;
      const name1 = this.designService.headerMenu[event.currentIndex].name;
      this.designService.headerMenu[event.previousIndex].name = name1;
      this.designService.headerMenu[event.currentIndex].name = name0;
      console.log(this.menu);
      this.designService.switchMenuItems(this.designService.headerMenu[event.previousIndex].id, this.designService.headerMenu[event.currentIndex].id).subscribe(x => {
        this.designService.headerMenu = x;
        console.log(this.menu);

      }, error => {
      });
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }


  drop($event: CdkDragSortEvent<MenuItem[]>) {
    console.log($event);
  }
}
