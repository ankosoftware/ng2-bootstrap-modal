import {
  Component, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Type
} from "@angular/core";
import {DialogComponent} from "./dialog.component";
import {DialogWrapperComponent} from "./dialog-wrapper.component";
import {Observable} from "rxjs";
import {DialogOptions} from "./dialog-options";

@Component({
  selector: 'dialog-holder',
  template: '<template #element></template>',
})
export class DialogHolderComponent {

  /**
   * Target element to insert dialogs
   * @type {ViewContainerRef}
   */
  @ViewChild('element', {read: ViewContainerRef}) private element: ViewContainerRef;

  /**
   * Array of dialogs
   * @type {Array<DialogComponent> }
   */
  dialogs: Array<DialogComponent> = [];

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Adds dialog
   * @param {Type<DialogComponent>} component
   * @param {any?} data
   * @param {DialogOptions?}options
   * @return {Observable<any>}
   */
  addDialog(component:Type<DialogComponent>, data?:any, options?:DialogOptions):Observable<any> {
    options = options || {};
    let factory = this.resolver.resolveComponentFactory(DialogWrapperComponent);
    let componentRef = this.element.createComponent(factory, options.index);
    let dialogWrapper: DialogWrapperComponent = <DialogWrapperComponent> componentRef.instance;
    let _component: DialogComponent =  dialogWrapper.addComponent(component);
    if(typeof(options.index) !== 'undefined') {
      this.dialogs.splice(options.index, 0, _component);
    }
    else {
      this.dialogs.push(_component);
    }
    setTimeout(()=>{
      dialogWrapper.container.nativeElement.classList.add('show')
    });
    if(options.autoCloseTimeout) {
      setTimeout(()=>{
        this.removeDialog(_component);
      }, options.autoCloseTimeout);
    }
    if(options.closeByClickingOutside) {
      dialogWrapper.closeByClickOutside();
    }
    return _component.fillData(data);
  }

  /**
   * Removes dialog
   * @param {DialogComponent} component
   */
  removeDialog(component:DialogComponent) {
    let element = component.wrapper.container.nativeElement;

    element.classList.remove('show');
    setTimeout(() => {
        this._removeElement(component);
    }, 300);
  }

  private _removeElement(component) {
    let index = this.dialogs.indexOf(component);
    if(index>-1) {
      this.element.remove(index);
      this.dialogs.splice(index, 1);
    }
  }

  clear() {
    this.element.clear();
    this.dialogs = [];
  }
}
