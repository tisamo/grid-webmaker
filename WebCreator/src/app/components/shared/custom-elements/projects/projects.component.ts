import { Component, OnInit } from '@angular/core';
import {DesignService} from "../../../../services/design.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(public designService: DesignService) { }

  ngOnInit(): void {
  }

}
