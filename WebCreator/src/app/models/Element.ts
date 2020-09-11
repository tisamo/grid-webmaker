export class WebElement {
  id: number;
  mode: string;
  color?: string;
  textColor?: string;
  height?: number;
  backgroundImage?: string;


  constructor(mode: string, color: string, textColor: string, height?: number, backgroundImage?: string) {
    this.mode = mode;
    this.color = color;
    this.textColor = textColor;
    this.height = height;
    this.backgroundImage = backgroundImage;
  }
}
