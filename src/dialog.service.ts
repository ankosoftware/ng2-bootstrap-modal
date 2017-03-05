import {
  Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type, Optional
} from "@angular/core";
import { DialogHolderComponent } from "./dialog-holder.component";
import { DialogComponent } from "./dialog.component";
import { Observable } from "rxjs";

export interface DialogOptions {
  index?: number;
  autoCloseTimeout?: number;
  closeByClickingOutside?: boolean;
  backdropColor?: string;
}

export class DialogServiceConfig {
  container: HTMLElement=null;
}

@Injectable()
export class DialogService {

  /**
   * Placeholder of modal dialogs
   * @type {DialogHolderComponent}
   */
  private dialogHolderComponent: DialogHolderComponent;

  /**
   * HTML container for dialogs
   * type {HTMLElement}
   */
  private container: HTMLElement;

  /**
   * @param {ComponentFactoryResolver} resolver
   * @param {ApplicationRef} applicationRef
   * @param {Injector} injector
   * @param {DialogServiceConfig} config
   */
  constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector, @Optional() config: DialogServiceConfig) {
    this.container = config && config.container;
  }

  /**
   * Adds dialog
   * @param {Type<DialogComponent<T, T1>>} component
   * @param {T?} data
   * @param {DialogOptions?} options
   * @return {Observable<T1>}
   */
  addDialog<T, T1>(component:Type<DialogComponent<T, T1>>, data?:T, options?:DialogOptions): Observable<T1> {
    if(!this.dialogHolderComponent) {
      this.dialogHolderComponent = this.createDialogHolder();
    }
    return this.dialogHolderComponent.addDialog<T, T1>(component, data, options);
  }

  /**
   * Hides and removes dialog from DOM
   * @param {DialogComponent} component
   */
  removeDialog(component:DialogComponent<any, any>): void {
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
