import { ComponentFactoryResolver, Type } from '@angular/core';
import { DialogComponent } from "./dialog.component";
import { DialogService } from "./dialog.service";
export declare class DialogWrapperComponent {
    private resolver;
    private dialogService;
    private element;
    container: any;
    private content;
    constructor(resolver: ComponentFactoryResolver, dialogService: DialogService);
    addComponent(component: Type<DialogComponent>): DialogComponent;
    closeByClickOutside(): void;
}
