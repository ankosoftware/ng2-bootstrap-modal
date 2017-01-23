import {
  Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ReflectiveInjector
} from '@angular/core';
import {DialogComponent} from "./dialog.component";

@Component({
  selector: 'dialog-wrapper',
  template: `
  <div class="modal fade" [ngClass]="{'in':shown}" style="display:block !important;" role="dialog">
    <div class="modal-dialog">
      <template #element></template>
    </div>
  </div>
  `
})
export class DialogWrapperComponent {
  @ViewChild('element', {read: ViewContainerRef}) private element: ViewContainerRef;
  private shown:boolean = false;
  private content: DialogComponent;

  constructor(private resolver: ComponentFactoryResolver) {}

  addComponent(component) {
    let factory = this.resolver.resolveComponentFactory(component);
    let injector = ReflectiveInjector.fromResolvedProviders([], this.element.injector);
    let componentRef = factory.create(injector);
    this.element.insert(componentRef.hostView);
    this.content =  <DialogComponent>componentRef.instance;
    this.content.wrapper = this;
    return this.content;
  }

  show() {
    this.shown = true;
  }
  hide() {
    this.shown = false;
  }
}


