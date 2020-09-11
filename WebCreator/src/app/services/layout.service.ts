import {Injectable} from '@angular/core';
import {GridsterConfig, GridsterItem} from "angular-gridster2";
import {LayoutHttpService} from "./layout-http.service";
import {LayoutItem} from "../models/layout-item";
import {DesignService} from "./design.service";

export class IComponent {
  id: number;
  componentRef: string;
  input: string;

  constructor(id: number, componentRef: string, input: string) {
    this.id = id;
    this.componentRef = componentRef;
    this.input = input;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  height = 0;
  bColor = 'white';
  resizeEnabler = true;
  backGroundImage = '';
  public options: GridsterConfig = {
    maxItemCols: 50,
    setGridSize: true,
    gridType: 'fit',
    enableEmptyCellDrop: true,
    disablePushOnDrag: this.resizeEnabler,
    minItemCols: 1,
    maxItemRows: 500,
    minItemRows: 1,
    maxItemArea: 2500,
    defaultItemCols: 1,
    defaultItemRows: 1,
    draggable: {
      enabled: false,
      stop: (event) => {
        console.log(event);
        console.log(this.layout);
        setTimeout(() => {
          this.layoutHttpService.editLayoutScape(this.layout).subscribe(x => {

            console.log(x);
          }, err => {
            console.log(err);
          });
        }, 1);

      }
    },
    pushItems: true,
    resizable: {
      enabled: false,
      stop: (event) => {
        setTimeout(() => {
          this.layoutHttpService.editLayoutScape(this.layout).subscribe(x => {


          }, err => {

          });
        }, 1);
      }
    }
  };
  public layout: LayoutItem[] = [];

  public components: IComponent[] = [];

  dropId: number;

  constructor(private layoutHttpService: LayoutHttpService, private designService: DesignService) {
    this.layoutHttpService.getLayout().subscribe(layouts => {
      this.layout = layouts;
      this.layout.forEach(x => {
        if (x.componentRef !== null) {
          const item = new IComponent(x.id, x.componentRef, x.input);
          this.components.push(item);
        }
      });
      console.log('fasz');
    }, err => {

    });
  }

  addItem(): void {
    const layout = new LayoutItem(5, 5, 0, 0, '');
    this.layoutHttpService.createLayout(layout).subscribe(x => {
      this.layout.push(x);
    }, err => {

    });

  }

  deleteItem(id): void {
    this.layoutHttpService.delLayout(this.layout[id].id).subscribe(layout => {
      this.layout.splice(id, 1);
    }, err => {

    });

  }

  setDropId(dropId: number): void {
    this.dropId = dropId;

  }

  dropItem(dragId: string, inp: string): void {
    const {components} = this;
    const comp: IComponent = components.find(c => c.id === this.dropId);
    const updateIdx: number = comp ? components.indexOf(comp) : components.length;
    const componentItem: IComponent = {
      id: this.dropId,
      componentRef: dragId,
      input: inp
    };
    const id = this.layout.findIndex(x => x.id === this.dropId);
    this.components = Object.assign([], components, {[updateIdx]: componentItem});
    const cRef = this.components.findIndex(x => x.id === this.dropId);
    this.layout[id].componentRef = this.components[cRef].componentRef;
    this.layout[id].input = componentItem.input;
    this.layoutHttpService.editLayout(this.layout[id]).subscribe(lay => {
      this.layout[id] = lay;
    });

  }

  getComponentRef(id: number): string {
    const comp = this.components.find(c => c.id === id);
    return comp ? comp.componentRef : null;
  }

  getInput(id: number): string {
    const comp = this.components.find(c => c.id === id);
    return comp ? comp.input : null;
  }

}
