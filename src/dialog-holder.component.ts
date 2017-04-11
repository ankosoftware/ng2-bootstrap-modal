import {
  Component, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Type
} from "@angular/core";
import {DialogComponent} from "./dialog.component";
import {DialogWrapperComponent} from "./dialog-wrapper.component";
import {Observable} from "rxjs";
import {DialogOptions} from "./dialog.service";

@Component({
  selector: 'dialog-holder',
  host: {
    '(body:keydown)': 'documentKeypress($event)'
  },
  template: '<template #element></template>',
})
export class DialogHolderComponent {

  /**
   * Target element to insert dialogs
   */
  @ViewChild('element', {read: ViewContainerRef}) public element: ViewContainerRef;

  /**
   * Array of dialogs
   * @type {Array<DialogComponent> }
   */
  dialogs: Array<DialogComponent<any, any>> = [];

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   */
  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Adds dialog
   * @param {Type<DialogComponent>} component
   * @param {object?} data
   * @param {DialogOptions?} options
   * @return {Observable<*>}
   */
  addDialog<T, T1>(component:Type<DialogComponent<T, T1>>, data?:T, options?:DialogOptions):Observable<T1> {
    options = options || <DialogOptions>{
      backdropColor: 'rgba(0,0,0,.5)',
      keyboard: true
    };
    
    // add body class if this is the only dialog in the stack
    if (!document.body.classList.contains('modal-open')) {
      document.body.classList.add('modal-open');
    }

    let factory = this.resolver.resolveComponentFactory(DialogWrapperComponent);
    let componentRef = this.element.createComponent(factory, options.index);
    let dialogWrapper: DialogWrapperComponent = <DialogWrapperComponent> componentRef.instance;
    let _component: DialogComponent<T,T1> =  dialogWrapper.addComponent(component);
    _component.options = options;
    if(typeof(options.index) !== 'undefined') {
      this.dialogs.splice(options.index, 0, _component);
    }
    else {
      this.dialogs.push(_component);
    }
    setTimeout(()=>{
      dialogWrapper.container.nativeElement.classList.add('show');
      dialogWrapper.container.nativeElement.classList.add('in');
    });
    if(options.autoCloseTimeout) {
      setTimeout(()=>{
        this.removeDialog(_component);
      }, options.autoCloseTimeout);
    }
    if(options.closeByClickingOutside) {
      dialogWrapper.closeByClickOutside();
    }
    if(options.backdropColor) {
      dialogWrapper.container.nativeElement.style.backgroundColor = options.backdropColor;
    }
    return _component.fillData(data);
  }

  /**
   * Removes dialog
   * @param {DialogComponent} component
   */
  removeDialog(component:DialogComponent<any, any>) {
    let element = component.wrapper.container.nativeElement;

    element.classList.remove('show');
    element.classList.remove('in');
    setTimeout(() => {
        this._removeElement(component);
        this.dialogs.length === 0 && document.body.classList.remove('modal-open');
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

  documentKeypress(event: KeyboardEvent) {
    // 检查是否最后一个
    if (this.dialogs.length <= 0) return ;

    // 移除最新一个组件
    let component = this.dialogs[this.dialogs.length - 1];
    if (component.options.keyboard === true)
      this.removeDialog(component);
  }
}
