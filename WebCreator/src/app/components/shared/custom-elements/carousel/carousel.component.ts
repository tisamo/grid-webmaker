import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  slides = ['https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', 'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', 'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
