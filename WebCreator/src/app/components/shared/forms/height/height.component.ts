import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DesignService} from "../../../../services/design.service";
import {LayoutService} from "../../../../services/layout.service";
import {WebElement} from "../../../../models/Element";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-height',
  templateUrl: './height.component.html',
  styleUrls: ['./height.component.scss']
})
export class HeightComponent implements OnInit, AfterViewInit {
  heightForm = new FormGroup({
    height: new FormControl(0, [Validators.required, Validators.min(500), Validators.max(2000)]),
    backGround: new FormControl('')
  });

  constructor(public design: DesignService,
              public dialogRef: MatDialogRef<HeightComponent>,
              public layout: LayoutService) {

  }

  setDesign() {
    const obj = new WebElement('header', '', '', this.heightForm.value.height, this.heightForm.value.backGround);
    this.design.editSpecsForElement(obj).subscribe((item: WebElement) => {
      this.layout.height = item.height;
      this.layout.resizeEnabler = false;
      this.layout.backGroundImage = item.backgroundImage;
      this.dialogRef.close();
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.layout.resizeEnabler = true;
  }

  ngAfterViewInit(): void {
    this.heightForm.controls['height'].setValue(this.layout.height);
    this.heightForm.controls['backGround'].setValue(this.layout.backGroundImage);
  }
}
