export class LayoutItem {
  id?: number;
  cols: number;
  rows: number;
  x: number;
  y: number;
  componentRef?: string;
  input: string;

  constructor(cols: number, rows: number, y: number, x: number, input: string, componentRef?: string, id?: number,) {
    this.id = id;
    this.cols = cols;
    this.rows = rows;
    this.y = y;
    this.x = x;
    this.input = input;
    this.componentRef = componentRef;
  }
}
