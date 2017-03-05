import { ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { DialogComponent } from "./dialog.component";
import { DialogService } from "./dialog.service";
export declare class DialogWrapperComponent {
    private resolver;
    private dialogService;
    element: ViewContainerRef;
    container: any;
    private content;
    constructor(resolver: ComponentFactoryResolver, dialogService: DialogService);
    addComponent<T, T1>(component: Type<DialogComponent<T, T1>>): DialogComponent<any, any>;
    closeByClickOutside(): void;
}
