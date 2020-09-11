export class Social {
  id?: number;
  name: string;
  link: string;
  image: string;

  constructor(name: string, link: string, image: string, id?: number) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.image = image;
  }
}
