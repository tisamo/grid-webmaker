import {Component, Input, OnInit} from '@angular/core';
import {DesignService} from "../../../services/design.service";
import {Gifs} from "../../../models/interfaces";

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss']
})
export class GifsComponent implements OnInit {
  @Input()
  social = '';
  selectedGif: Gifs = null;

  constructor(private designService: DesignService) {
  }

  ngOnInit(): void {
    this.selectGif();
  }

  selectGif() {
    const index = this.designService.gifs.findIndex(x => x.name === this.social);
    this.selectedGif = this.designService.gifs[index];
  }
}
