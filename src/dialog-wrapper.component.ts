import {
  Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ReflectiveInjector, Type
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

  /**
   * Target element to insert dialog content component
   * @type {ViewContainerRef}
   */
  @ViewChild('element', {read: ViewContainerRef}) private element: ViewContainerRef;

  /**
   *
   * @type {boolean}
   */
  private shown:boolean = false;

  /**
   * Dialog content componet
   * @type {DialogComponent}
   */
  private content: DialogComponent;

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Adds content dialog component to wrapper
   * @param {Type<DialogComponent>} component
   * @return {DialogComponent}
   */
  addComponent(component: Type<DialogComponent>) {
    let factory = this.resolver.resolveComponentFactory(component);
    let injector = ReflectiveInjector.fromResolvedProviders([], this.element.injector);
    let componentRef = factory.create(injector);
    this.element.insert(componentRef.hostView);
    this.content =  <DialogComponent>componentRef.instance;
    this.content.wrapper = this;
    return this.content;
  }

  /**
   * Shows dialog
   */
  show():void {
    this.shown = true;
  }

  /**
   * Hides dialog
   */
  hide():void {
    this.shown = false;
  }
}


