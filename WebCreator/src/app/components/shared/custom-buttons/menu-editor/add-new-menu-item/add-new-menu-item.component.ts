import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppRoutingModule, routes} from "../../../../../app-routing.module";
import {MenuItem} from "../../../../../models/MenuItem";
import {DesignService} from "../../../../../services/design.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-add-new-menu-item',
  templateUrl: './add-new-menu-item.component.html',
  styleUrls: ['./add-new-menu-item.component.scss']
})
export class AddNewMenuItemComponent implements OnInit {
  routePaths = [];
  newForm;


  constructor(private diaglogRef: MatDialogRef<AddNewMenuItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MenuItem,
              private designService: DesignService) {
    this.diaglogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.getRoutes();
    this.setFromControl();
  }

  setFromControl() {
    if (this.data === null) {
      this.newForm = new FormGroup({
        menuName: new FormControl('', Validators.required),
        menuRouterLink: new FormControl('', Validators.required)
      });
    } else {
      this.newForm = new FormGroup({
        menuName: new FormControl(this.data.name, Validators.required),
        menuRouterLink: new FormControl(this.data.routerLink, Validators.required)
      });
    }
  }

  getRoutes() {
    routes.forEach(route => {
      if (!route.path.includes('/')) {
        this.routePaths.push(route.path);
      }
    });
    this.routePaths.shift();
  }

  selectRoute(i) {
    this.newForm.controls['menuRouterLink'].setValue(this.routePaths[i]);
  }

  newItem() {
    const menuItem = new MenuItem(this.newForm.value.menuName, 'header', this.newForm.value.menuRouterLink);
    this.diaglogRef.close(menuItem);
  }

  saveItem() {
    const menuItem = new MenuItem(this.newForm.value.menuName, 'header', this.newForm.value.menuRouterLink, this.data.id);
    this.designService.editMenuItem(menuItem).pipe(take(1)).subscribe(menu => {
    this.diaglogRef.close(menu);
    });
  }

  cancel() {
    this.diaglogRef.close();
  }
}
