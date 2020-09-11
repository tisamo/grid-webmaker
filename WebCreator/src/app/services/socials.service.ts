import {Injectable} from '@angular/core';
import {HttpClient,} from "@angular/common/http";

import {Social} from "../models/Socials";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SocialsService {
  socials: Social[] = [];

  constructor(private http: HttpClient) {
  }

  getAllSocials() {
    return this.http.get<Social[]>(environment.api_url + '/socials');
  }

  createSocial(social: Social) {
    return this.http.post<Social>(environment.api_url + '/socials', social);
  }

  editSocial(id, social: Social) {
    return this.http.patch<Social>(environment.api_url + '/socials/' + id, social);
  }

  deleteSocial(id) {
    return this.http.delete(environment.api_url + '/socials/' + id);
  }

  findByName(name) {
    return this.http.get<Social>(environment.api_url + '/socials/find-by-name/' + name);
  }
}
