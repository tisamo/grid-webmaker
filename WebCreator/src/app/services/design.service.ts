import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {WebElement} from "../models/Element";
import {MenuItem} from "../models/MenuItem";
import {Gifs} from "../models/interfaces";


@Injectable({
  providedIn: 'root'
})
export class DesignService {
  headerColor = '';
  headerTextColor = '';
  editor = false;
  editMode = false;
  headerEdit = true;
  headerMenu: MenuItem[] = [];
  gifs: Gifs[] = [];

  constructor(private http: HttpClient) {

  }


  createMenuItem(menuItem: MenuItem) {
    return this.http.post<MenuItem>(environment.api_url + '/menus', menuItem);
  }

  editMenuItem(menuItem: MenuItem) {
    return this.http.put<MenuItem[]>(environment.api_url + '/menus/' + menuItem.id, menuItem);
  }

  deleteMenuItem(id) {
    return this.http.delete(environment.api_url + '/menus/' + id);
  }

  getHeaderMenuItems(typeOfMenu: string) {
    return this.http.get<MenuItem[]>(environment.api_url + '/menus/type/' + typeOfMenu);
  }

  switchMenuItems(idOne: number, idTwo: number) {
    const obj = {id1: idOne, id2: idTwo};
    return this.http.put<MenuItem[]>(environment.api_url + '/menus/switch', obj);
  }

  getSpecsForElement(element: string) {
    return this.http.get<WebElement>(environment.api_url + '/designs/mode/' + element);
  }

  editSpecsForElement(obj: WebElement) {
    return this.http.put(environment.api_url + '/designs/mode/' + obj.mode, obj);
  }

  getGifs() {
    return this.http.get<Gifs[]>(environment.api_url + '/gifs');

  }
}
