import { ComponentFactoryResolver, Type } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { Observable } from "rxjs";
export declare class DialogHolderComponent {
    private resolver;
    private element;
    dialogs: Array<DialogComponent>;
    constructor(resolver: ComponentFactoryResolver);
    addDialog(component: Type<DialogComponent>, data?: any, index?: number): Observable<any>;
    removeDialog(component: DialogComponent): void;
    private _removeElement(component);
}
