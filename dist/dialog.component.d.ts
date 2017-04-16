import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogWrapperComponent } from "./dialog-wrapper.component";
import { DialogService, DialogOptions } from "./dialog.service";
export declare class DialogComponent<T, T1> implements OnDestroy {
    protected dialogService: DialogService;
    options: DialogOptions;
    private observer;
    protected result: T1;
    wrapper: DialogWrapperComponent;
    constructor(dialogService: DialogService);
    fillData(data: T): Observable<T1>;
    close(): void;
    ngOnDestroy(): void;
}
