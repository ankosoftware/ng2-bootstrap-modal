import {
  Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ReflectiveInjector, Type, Output, EventEmitter
} from '@angular/core';
import {DialogComponent} from "./dialog.component";

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
   * Notify the parent DialogHolder
   */
  @Output() onDialogClose = new EventEmitter();

  /**
   * Target element to insert dialog content component
   */
  @ViewChild('element', {read: ViewContainerRef}) public element: ViewContainerRef;

  /**
   * Link container DOM element
   */
  @ViewChild('container') public container;

  /**
   * Dialog content componet
   * @type {DialogComponent}
   */
  private content: DialogComponent<any, any>;

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   * @param {DialogService} dialogService
   */
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Adds content dialog component to wrapper
   * @param {Type<DialogComponent>} component
   * @return {DialogComponent}
   */
  addComponent<T, T1>(component: Type<DialogComponent<T, T1>>) {
    let factory = this.resolver.resolveComponentFactory(component);
    let injector = ReflectiveInjector.fromResolvedProviders([], this.element.injector);
    let componentRef = factory.create(injector);
    this.element.insert(componentRef.hostView);
    this.content =  <DialogComponent<T, T1>> componentRef.instance;
    this.content.wrapper = this;
    return this.content;
  }

  /**
   * Registers event handler to close dialog by click on backdrop
   */
  closeByClickOutside() {
    const containerEl = this.container.nativeElement;
    containerEl.querySelector('.modal-content').addEventListener('click', (event)=> {
      event.stopPropagation();
    });
    containerEl.addEventListener('click', () => {
        this.onDialogClose.emit();
    }, false);
  }
}


