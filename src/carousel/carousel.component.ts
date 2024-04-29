import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  @ViewChild('carousel') carousel!: ElementRef<HTMLElement>;

  private _renderer = inject(Renderer2);
  private _slides: HTMLElement[] = [];

  public activeSlideIndex = 0;

  ngAfterViewInit(): void {
    this._slides = Array.from(
      this.carousel.nativeElement.children
    ) as HTMLElement[];

    this.selectSlide(this._slides[0]);

    fromEvent(this._slides[0], 'transitionend').subscribe(() => {
      if (this.activeSlideIndex > 5) {
        this._renderer.addClass(this.carousel.nativeElement, 'transition-none');
        this.selectSlide(this._slides[this.activeSlideIndex - 4], false);
      }
    });
  }

  public selectSlide(slide: HTMLElement, animation = true): void {
    if (slide !== this.carousel.nativeElement) {
      animation &&
        this._renderer.removeClass(
          this.carousel.nativeElement,
          'transition-none'
        );

      this.activeSlideIndex = this._slides.findIndex((el) => el === slide);
      this._slides.forEach((slide, index) => {
        const indexOffset = index - this.activeSlideIndex;
        const slideOffset =
          indexOffset < 0
            ? indexOffset * 12
            : indexOffset * 12 + Math.sign(indexOffset) * 54;

        this._renderer.setStyle(
          slide,
          'transform',
          `translateX(${slideOffset}cqw)`
        );
        this._renderer.removeClass(slide, 'active');
      });

      this._renderer.addClass(slide, 'active');
    }
  }

  public slideByNav(index: number): void {
    const indexDelta = index - (this.activeSlideIndex % 4);
    const newSlideIndex =
      this.activeSlideIndex + (indexDelta > 0 ? indexDelta : indexDelta + 4);

    this.selectSlide(this._slides[newSlideIndex]);
  }
}
