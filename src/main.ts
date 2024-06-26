import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  template: `
    <app-carousel />
  `,
})
export class App {}

bootstrapApplication(App);
