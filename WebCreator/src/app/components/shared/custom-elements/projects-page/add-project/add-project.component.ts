import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DesignService} from "../../../../../services/design.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../../services/project.service";
import {Project} from "../../../../../models/project";
import {TextEditorComponent} from "../../text-editor/text-editor.component";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class AddProjectComponent implements OnInit {
  width = window.innerWidth;
  height = window.innerHeight;
  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<AddProjectComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any, private projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

  createProject() {
    const project = new Project(this.projectForm.value.name, this.projectForm.value.image, this.projectForm.value.description, this.projectForm.value.text);
    this.projectService.createProject(project).subscribe((projects) => {
      Swal.fire({
        title: 'Good Job',
        text: 'You created a new Project',
        icon: 'success',
        confirmButtonText: 'superb!',
      }).then(() => {
        this.dialogRef.close(projects);
      });
    }, err => {
      console.log(err);

    });
  }

  openTextEditor() {
    const dialogRef = this.dialog.open(TextEditorComponent, {
      height: (this.height / 1.5).toString() + 'px',
      width: (this.width / 2).toString() + 'px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projectForm.controls['text'].setValue(result);
    });
  }

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
  }
}

