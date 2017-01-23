import {
  Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type
} from "@angular/core";
import {DialogHolderComponent} from "./dialog-holder.component";
import {DialogComponent} from "./dialog.component";
import {Observable} from "rxjs";

@Injectable()
export class DialogService  {

  /**
   * Placeholder of modal dialogs
   * @type {DialogHolderComponent}
   */
  private dialogHolderComponent : DialogHolderComponent;

  /**
   * @param {ComponentFactoryResolver} resolver
   * @param {ApplicationRef} applicationRef
   * @param {Injector} injector
   */
  constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) {}

  /**
   * Adds dialog
   * @param {Type<DialogComponent>} component
   * @param {any?} data
   * @param {number?} index
   * @return {Observable<any>}
   */
  addDialog(component:Type<DialogComponent>, data?:any, index?:number): Observable<any> {
    if(!this.dialogHolderComponent) {
      this.dialogHolderComponent = this.createDialogHolder();
    }
    return this.dialogHolderComponent.addDialog(component, data, index);
  }

  /**
   * Hides and removes dialog from DOM
   * @param {DialogComponent} component
   */
  removeDialog(component:DialogComponent): void {
    if(!this.dialogHolderComponent) {
      return;
    }
    this.dialogHolderComponent.removeDialog(component);
  }

  /**
   * Creates and add to DOM dialog holder component
   * @return {DialogHolderComponent}
   */
  private createDialogHolder(): DialogHolderComponent {
    let componentFactory = this.resolver.resolveComponentFactory(DialogHolderComponent);
    let componentRef = componentFactory.create(this.injector);
    let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    let componentRootViewConainer = this.applicationRef['_rootComponents'][0];
    let rootLocation: Element =   (componentRootViewConainer.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.applicationRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    rootLocation.appendChild(componentRootNode);

    return componentRef.instance;
  }
}
