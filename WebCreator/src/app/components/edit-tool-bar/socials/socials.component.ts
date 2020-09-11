import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Social} from "../../../models/Socials";
import {soc} from "../social-manager/social-manager.component";
import {SocialsService} from "../../../services/socials.service";
import {take} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {CustomValidators} from "ngx-custom-validators";

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit, AfterViewInit {
  @Input()
  social = '';
  socials: soc[] = [
    {name: 'facebook', image: 'assets/img/facebook.png'},
    {name: 'twitter', image: 'assets/img/twitter.png'},
    {name: 'vk', image: 'assets/img/vk.png'},
    {name: 'linkedin', image: 'assets/img/linkedin.png'},
    {name: 'instagram', image: 'assets/img/instagram.png'},
    {name: 'soundcloud', image: 'assets/img/soundcloud.png'}];
  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  socialForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    link: new FormControl('', [Validators.required, CustomValidators.url])
  });

  constructor(private socialsService: SocialsService,
              private dialogRef: MatDialogRef<SocialsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Social) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.data !== null) {
      this.socialForm.controls['name'].setValue(this.data.name);
      this.socialForm.controls['link'].setValue(this.data.link);
      this.socialForm.controls['image'].setValue(this.data.image);
    }else{
      this.socialForm.controls['link'].setValue('https://www.');
    }
  }

  createSocial() {
    const name = this.socialForm.controls['name'].value;
    const link = this.socialForm.controls['link'].value;
    const image = this.socialForm.controls['image'].value;
    if (!link.includes(name)) {
      Swal.fire({
        icon: 'error',
        title: 'Your link is not pointing to ' + name + '!',
        text: 'Got you!',
        confirmButtonText: 'fine...'
      });
    } else {
      const social = new Social(name, link, image);
      this.socialsService.createSocial(social).pipe((take(1))).subscribe(socials => {
        this.dialogRef.close(socials);
      }, err => {
        const error = err.error;
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: err.error.error.statusCode,
          text: err.error.error.message,
          confirmButtonText: 'ok'
        });
      });
    }

  }


  pickSocial(i) {
    this.socialForm.controls['name'].setValue(this.socials[i].name);
    this.socialForm.controls['image'].setValue(this.socials[i].image);
  }

  modify() {
    const name = this.socialForm.controls['name'].value;
    let link = this.socialForm.controls['link'].value;
    const image = this.socialForm.controls['image'].value;
    if (!link.includes(name)) {
      Swal.fire({
        icon: 'error',
        title: 'Your link is not pointing to ' + name + '!',
        text: 'Got you!',
        confirmButtonText: 'fine...'
      });
    } else {
      const social = new Social(name, link, image);
      this.socialsService.editSocial(this.data.id, social).pipe((take(1))).subscribe(socials => {
        this.dialogRef.close(socials);
      }, err => {
        const error = err.error;
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: err.error.error.statusCode,
          text: err.error.error.message,
          confirmButtonText: 'ok'
        });
      });
    }

  }
}
