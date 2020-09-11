import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Email} from "../../../../models/email";
import {LayoutHttpService} from "../../../../services/layout-http.service";

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  emailForm = new FormGroup({
    name: new FormControl('', Validators.required),
    subject: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', Validators.required)
  });
  submitted = false;
  text = '';
  name = '';
  subject = '';

  constructor(private http: LayoutHttpService) {
  }

  ngOnInit(): void {
  }

  get f() {
    return this.emailForm.controls;
  }

  onSubmit() {
    const email = new Email(this.emailForm.value.name, this.emailForm.value.subject, this.emailForm.value.text);
    this.submitted = true;
    if (!this.emailForm.valid) {
      setTimeout(() => {
        this.submitted = false;
      }, 2000);
    } else {
      this.http.sendEmail(email).subscribe(x => {
        console.log(x);
        this.text = '';
        this.name = '';
        this.subject = '';
        this.submitted = false;
      }, err => {
        console.log(err);
      });
    }
  }
}
