import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../../../../services/project.service";
import {Project} from "../../../../../models/project";

@Component({
  selector: 'app-selected-project',
  templateUrl: './selected-project.component.html',
  styleUrls: ['./selected-project.component.scss']
})
export class SelectedProjectComponent implements OnInit {
  project: Project;
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.project = this.projectService.selecetedProject;
    console.log(this.project);
  }

}
