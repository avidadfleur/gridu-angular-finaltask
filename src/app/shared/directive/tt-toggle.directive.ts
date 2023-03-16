import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[ttIf]'
})
export class TtToggleDirective {

  _ttIf!: boolean;
 
  constructor(private _viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>) {
  }

  @Input()
  set ttIf (condition: boolean) {
    this._ttIf = condition
    this._updateView();
  }
 
  _updateView() {
    if (this._ttIf) {
      this._viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      this._viewContainer.clear();
    }
  }

}
