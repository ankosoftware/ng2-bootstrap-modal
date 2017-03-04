import {
  Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ReflectiveInjector, Type
} from '@angular/core';
import {DialogComponent} from "./dialog.component";
import {DialogService} from "./dialog.service";

@Component({
  selector: 'dialog-wrapper',
  template: `
  <div #container class="modal fade" style="display:block !important;" role="dialog">
      <template #element></template>
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
   * Link container DOM element
   */
  @ViewChild('container') public container;

  /**
   * Dialog content componet
   * @type {DialogComponent}
   */
  private content: DialogComponent;

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   * @param {DialogService} dialogService
   */
  constructor(private resolver: ComponentFactoryResolver, private dialogService: DialogService) {}

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

  closeByClickOutside() {
    this.container.nativeElement.addEventListener('click', (event)=>{
      if(event.target == this.container.nativeElement) {
        this.dialogService.removeDialog(this.content);
      }
    }, false);
  }
}


