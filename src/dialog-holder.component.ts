import {
  Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector,
  Type
} from "@angular/core";
import {DialogComponent} from "./dialog.component";
import {DialogWrapperComponent} from "./dialog-wrapper.component";

@Component({
  selector: 'dialog-holder',
  template: '<template #element></template>',
})
export class DialogHolderComponent {

  @ViewChild('element', {read: ViewContainerRef}) private element: ViewContainerRef;

  dialogs: Array<any> = [];

  constructor(private resolver: ComponentFactoryResolver) {

  }

  addDialog(component:Type<DialogComponent>, data?:any, index?:number) {
    let factory = this.resolver.resolveComponentFactory(DialogWrapperComponent);
    let componentRef = this.element.createComponent(factory, index);
    let dialogWrapper: DialogWrapperComponent = <DialogWrapperComponent> componentRef.instance;
    let _component: DialogComponent =  dialogWrapper.addComponent(component);
    if(typeof(index) !== 'undefined') {
      this.dialogs.splice(index, 0, _component);
    }
    else {
      this.dialogs.push(_component);
    }
    setTimeout(()=>{
      dialogWrapper.show();
    });
    return _component.fillData(data);
  }

  removeDialog(component:DialogComponent) {
    component.wrapper.hide();
    setTimeout(()=>{
      let index = this.dialogs.indexOf(component);
      if(index>-1) {
        this.element.remove(index);
        this.dialogs.splice(index, 1);
      }
    }, 500);
  }
}
