import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogWrapperComponent } from "./dialog-wrapper.component";
import { DialogService } from "./dialog.service";
export declare abstract class DialogComponent implements OnDestroy {
    protected dialogService: DialogService;
    private observer;
    protected result: any;
    wrapper: DialogWrapperComponent;
    constructor(dialogService: DialogService);
    fillData(data?: any): Observable<any>;
    close(): void;
    ngOnDestroy(): void;
}
