import {Component, Input, OnInit} from '@angular/core';
import {SocialsService} from "../../../services/socials.service";
import {Social} from "../../../models/Socials";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  @Input()
  social = '';
  socailFromServer: Social = null;

  constructor(private socialsService: SocialsService) {
  }

  ngOnInit(): void {
    this.getSocial();
  }

  getSocial() {
    const index = this.socialsService.socials.findIndex(x => x.name === this.social);
    this.socailFromServer = this.socialsService.socials[index];
  }

}
