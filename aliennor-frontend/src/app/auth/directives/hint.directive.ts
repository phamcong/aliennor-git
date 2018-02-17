import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHint]'
})
export class HintDirective {
  mainClass = {
    valid: 'valid',
    invalid: 'invalid'
  };

  constructor(
    private er: ElementRef,
    private renderer: Renderer2
  ) { }

  @Input() set appHint(isValid: boolean | {[key: string]: boolean}) {
    // get current text
    const currentText = this.er.nativeElement.innerText;

    // clear current text and remove eventual valid classes
    this.renderer.setAttribute(this.er.nativeElement, 'innerText', '');
    this.renderer.removeClass(this.er.nativeElement, this.mainClass.valid);
    //
    // // create icon and set styles
    const icon = this.renderer.createElement("i");
    this.renderer.addClass(icon, 'fa');
    this.renderer.appendChild(this.er.nativeElement, icon);

    let resultClasses = [];
    if (isValid) {
      resultClasses = ['fa-check', this.mainClass.valid];
    } else {
      resultClasses = ['fa-times', this.mainClass.invalid];
    }
    this.renderer.addClass(icon, resultClasses[0]);
    this.renderer.addClass(this.er.nativeElement, resultClasses[1]);

    // append previous text
    this.renderer.createText(currentText);
  }
}
