export class Project {
  id: number;
  name: string;
  image: string;
  description: string;
  text: string;


  constructor(name: string, image: string, description: string, text: string, id?: number) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.text = text;

  }
}
