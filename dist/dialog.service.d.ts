import { ComponentFactoryResolver, ApplicationRef, Injector, Type } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { Observable } from "rxjs";
export declare class DialogService {
    private resolver;
    private applicationRef;
    private injector;
    private dialogHolderComponent;
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector);
    addDialog(component: Type<DialogComponent>, data?: any, index?: number): Observable<any>;
    removeDialog(component: DialogComponent): void;
    private createDialogHolder();
}
