export class MenuItem {
  id: number;
  name: string;
  type: string;
  routerLink: string;

  constructor(name: string, type: string, routerLink: string, id?: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.routerLink = routerLink;
  }
}
