import {Component, OnInit} from '@angular/core';
import {DesignService} from "../../../../services/design.service";

@Component({
  selector: 'app-edit-switcher',
  templateUrl: './edit-switcher.component.html',
  styleUrls: ['./edit-switcher.component.scss']
})
export class EditSwitcherComponent implements OnInit {

  constructor(public designService: DesignService) {

  }

  swtichMode() {
    this.designService.editor = !this.designService.editor;
  }

  ngOnInit(): void {
  }

}
