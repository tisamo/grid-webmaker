import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {LayoutItem} from "../models/layout-item";

@Injectable({
  providedIn: 'root'
})
export class LayoutHttpService {

  constructor(private http: HttpClient) {
  }

  createLayout(layout: LayoutItem) {
    return this.http.post<LayoutItem>(environment.api_url + '/layouts', layout);
  }

  getLayout() {
    return this.http.get<LayoutItem[]>(environment.api_url + '/layouts');
  }

  editLayout(layoutItem: LayoutItem) {;
    return this.http.put<LayoutItem>(environment.api_url + '/layouts/' + layoutItem.id, layoutItem);
  }

  editLayoutScape(layoutItem: LayoutItem[]) {
    return this.http.put<LayoutItem[]>(environment.api_url + '/layouts/', layoutItem);
  }

  delLayout(id) {
    return this.http.delete<LayoutItem[]>(environment.api_url + '/layouts/' + id);
  }

  sendEmail(email) {
    return this.http.post(environment.api_url + '/emails', email);
  }
}
