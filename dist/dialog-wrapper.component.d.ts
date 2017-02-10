import { ComponentFactoryResolver, Type } from '@angular/core';
import { DialogComponent } from "./dialog.component";
export declare class DialogWrapperComponent {
    private resolver;
    private element;
    container: any;
    private content;
    constructor(resolver: ComponentFactoryResolver);
    addComponent(component: Type<DialogComponent>): DialogComponent;
}
