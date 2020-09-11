import {Component, OnInit} from '@angular/core';
import {Social} from "../../../models/Socials";
import {SocialsService} from "../../../services/socials.service";
import {take} from "rxjs/operators";
import {AddNewMenuItemComponent} from "../../shared/custom-buttons/menu-editor/add-new-menu-item/add-new-menu-item.component";
import Swal from "sweetalert2";
import {FormControl, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SocialsComponent} from "../socials/socials.component";

export interface soc {
  name: string;
  image: string;
}

@Component({
  selector: 'app-social-manager',
  templateUrl: './social-manager.component.html',
  styleUrls: ['./social-manager.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})

export class SocialManagerComponent implements OnInit {
  width = window.innerWidth / 1.75;
  height = window.innerHeight / 1.75;
  dataTosend = null;
  socials: Social[] = [];

  constructor(private socialsService: SocialsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getSocials();
  }

  getSocials() {
    this.socialsService.getAllSocials().pipe(take(1)).subscribe(socials => {
      this.socials = socials;

    }, err => {
    });
  }


  deleteSocial(i) {
    const item = this.socials[i];
    this.socialsService.deleteSocial(item.id).pipe(take(1)).subscribe(x => {
      const index = this.socials.findIndex(x => x.id === item.id);
      this.socials.splice(index, 1);
    }, error => {
      console.log(error);
    });

  }

  editMenu(i?: any) {
    if (i) {
      this.dataTosend = this.socials[i];
    }

    const dialogRef = this.dialog.open(SocialsComponent, {
      height: this.height.toString() + 'px',
      width: this.width + 'px',
      data: this.dataTosend
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire({
          icon: 'success',
          title: 'Social saved',
          text: 'fine job!',
          confirmButtonText: `Awesome`,
        }).then(() => {
          this.socials = result;
          this.socialsService.socials = result;
        });
      }
    });
  }


  onWindowResize(event: any) {
    this.width = event.target.innerWidth / 1.75;
    this.height = event.target.innerHeight / 1.75;

  }
}
