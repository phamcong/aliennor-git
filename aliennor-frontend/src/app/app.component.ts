import { AfterViewInit, Component, Renderer, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    // hide preloader
    const preloader: HTMLElement = document.getElementById('preloader');
    this.renderer.addClass(preloader, 'loaded');
  }
}
