import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selecetedProject: Project;
  constructor(private http: HttpClient) {
  }

  createProject(project: Project) {
    return this.http.post(environment.api_url + '/projects/', project);
  }

  getProjects() {
    return this.http.get<Project[]>(environment.api_url + '/projects');
  }
}
