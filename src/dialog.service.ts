import {
  Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type
} from "@angular/core";
import {DialogHolderComponent} from "./dialog-holder.component";
import {DialogComponent} from "./dialog.component";
import {Observable} from "rxjs";
import {DialogOptions} from "./dialog-options";

@Injectable()
export class DialogService  {

  /**
   * Placeholder of modal dialogs
   * @type {DialogHolderComponent}
   */
  private dialogHolderComponent : DialogHolderComponent;
  private container: Element;

  /**
   * @param {ComponentFactoryResolver} resolver
   * @param {ApplicationRef} applicationRef
   * @param {Injector} injector
   */
  constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) {}

  setCointainer(container: Element) {
    if(this.dialogHolderComponent) {
      throw new Error('Dialog container already installed, try set container before create first dialog');
    }
    this.container = container;
  };
  /**
   * Adds dialog
   * @param {Type<DialogComponent>} component
   * @param {any?} data
   * @param {DialogOptions?} options
   * @return {Observable<any>}
   */
  addDialog(component:Type<DialogComponent>, data?:any, options?:DialogOptions): Observable<any> {
    if(!this.dialogHolderComponent) {
      this.dialogHolderComponent = this.createDialogHolder();
    }
    return this.dialogHolderComponent.addDialog(component, data, options);
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
   * Closes all dialogs
   */
  removeAll(): void {
    this.dialogHolderComponent.clear();
  }

  /**
   * Creates and add to DOM dialog holder component
   * @return {DialogHolderComponent}
   */
  private createDialogHolder(): DialogHolderComponent {

    let componentFactory = this.resolver.resolveComponentFactory(DialogHolderComponent);

    let componentRef = componentFactory.create(this.injector);
    let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    if(!this.container) {
      let componentRootViewContainer = this.applicationRef['_rootComponents'][0];
      this.container = (componentRootViewContainer.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
    this.applicationRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });
    this.container.appendChild(componentRootNode);

    return componentRef.instance;
  }
}
