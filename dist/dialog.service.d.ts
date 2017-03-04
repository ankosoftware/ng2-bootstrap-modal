import { ComponentFactoryResolver, ApplicationRef, Injector, Type } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { Observable } from "rxjs";
import { DialogOptions } from "./dialog-options";
export declare class DialogService {
    private resolver;
    private applicationRef;
    private injector;
    private dialogHolderComponent;
    private container;
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector);
    setCointainer(container: Element): void;
    addDialog(component: Type<DialogComponent>, data?: any, options?: DialogOptions): Observable<any>;
    removeDialog(component: DialogComponent): void;
    removeAll(): void;
    private createDialogHolder();
}
