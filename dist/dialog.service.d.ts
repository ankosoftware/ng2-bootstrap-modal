import { ComponentFactoryResolver, ApplicationRef, Injector, Type } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { Observable } from "rxjs";
export interface DialogOptions {
    index?: number;
    autoCloseTimeout?: number;
    closeByClickingOutside?: boolean;
    backdropColor?: string;
}
export declare class DialogServiceConfig {
    container: HTMLElement;
}
export declare class DialogService {
    private resolver;
    private applicationRef;
    private injector;
    private dialogHolderComponent;
    private container;
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, config: DialogServiceConfig);
    addDialog<T, T1>(component: Type<DialogComponent<T, T1>>, data?: T, options?: DialogOptions): Observable<T1>;
    removeDialog(component: DialogComponent<any, any>): void;
    removeAll(): void;
    private createDialogHolder();
}
