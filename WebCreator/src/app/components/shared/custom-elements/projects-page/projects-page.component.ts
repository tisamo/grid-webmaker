import {Component, OnInit} from '@angular/core';
import {Project} from "../../../../models/project";
import {DesignService} from "../../../../services/design.service";
import {ColorPickerComponent} from "../../color-picker/color-picker.component";
import {MatDialog} from "@angular/material/dialog";
import {AddProjectComponent} from "./add-project/add-project.component";
import {ProjectService} from "../../../../services/project.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})
export class ProjectsPageComponent implements OnInit {
  projects: Project[] = [];
  projectSideName = 'Projects';
  project = [];
  route = 0;
  width = window.innerWidth;
  height = window.innerHeight;
  mobileWidth = 760;

  addProject() {

  }

  constructor(private dialog: MatDialog,
              public designService: DesignService,
              private projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.getProjects();
    this.project = [...this.projectSideName];
  }

  openCreateProject() {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      height: (this.height / 1.5).toString() + 'px',
      width: (this.width / 2).toString() + 'px',
    });

    dialogRef.afterClosed().subscribe((result: Project[]) => {
      if (result.length > 0) {
        this.projects = result;
      }

    });
  }

  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;

  }

  getProjects() {
    this.projectService.getProjects().pipe(take(1)).subscribe((projects) => {
      this.projects = projects;
    }, err => {
      console.log(err);
    });
  }

  openProject(i: number) {
    this.route = this.projects[i].id;
    this.projectService.selecetedProject = this.projects[i];
  }
}
