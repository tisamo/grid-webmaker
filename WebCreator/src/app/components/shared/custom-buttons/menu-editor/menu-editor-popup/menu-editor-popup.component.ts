import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../../../../../models/MenuItem";
import {DesignService} from "../../../../../services/design.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {LayoutService} from "../../../../../services/layout.service";
import {AddNewMenuItemComponent} from "../add-new-menu-item/add-new-menu-item.component";
import Swal from "sweetalert2";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-menu-editor-popup',
  templateUrl: './menu-editor-popup.component.html',
  styleUrls: ['./menu-editor-popup.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class MenuEditorPopupComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menuTosend: MenuItem[] = [];
  editMode = false;
  dataTosend = null;
  menuForm = new FormGroup({});
  width = window.innerWidth / 1.5;
  height = window.innerHeight / 1.5;

  constructor(public designService: DesignService,
              private dialog: MatDialog,
              private layout: LayoutService) {
  }

  ngOnInit(): void {
    this.menuItems = this.designService.headerMenu;
    this.getControls();
  }

  getControls() {
    this.menuItems.forEach(menuItem => {
      this.menuForm.addControl(menuItem.id.toString(), new FormControl(menuItem.name, Validators.required));
      this.menuForm.addControl(menuItem.id.toString() + 'router', new FormControl(menuItem.routerLink, Validators.required));
    });
  }

  setControls() {
    this.menuItems.forEach(menuItem => {
      this.menuForm.controls[menuItem.id.toString()].setValue(menuItem.name);
      this.menuForm.controls[menuItem.id.toString() + 'router'].setValue(menuItem.routerLink);
    });
  }

  openAddNewMenuItemWindow() {
    const dialogRef = this.dialog.open(AddNewMenuItemComponent, {
      width: this.width + 'px',
      height: this.height + 'px',
      data: this.dataTosend
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (this.editMode === false) {
          this.designService.createMenuItem(result).pipe(take(1)).subscribe(x => {
            Swal.fire({
              title: 'Good Job',
              text: 'You created a new Menuitem',
              icon: 'success',
              confirmButtonText: 'superb!',
            }).then(() => {
              this.menuItems.push(x);
              this.menuForm.addControl(x.id.toString(), new FormControl(x.name, Validators.required));
              this.menuForm.addControl(x.id.toString() + 'router', new FormControl(x.routerLink, Validators.required));
            });

          });
        } else {
          this.menuItems = result;
          this.designService.headerMenu = result;
          this.setControls();
        }
      }


    });
  }

  editMenu(i) {
    this.editMode = true;
    const menuItem = this.menuItems[i];
    this.dataTosend = menuItem;
    this.openAddNewMenuItemWindow();
  }

  cancel() {

  }

  deleteMenuItem(id) {
    this.designService.deleteMenuItem(this.menuItems[id].id).pipe(take(1)).subscribe(() => {
      this.menuItems.splice(id, 1);
    });
  }

  onWindowResize($event: any) {
    this.height = $event.target.innerHeight / 1.5;
    this.width = $event.target.innerWidth / 1.5;
  }
}
