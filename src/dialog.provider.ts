import {DialogService} from "./dialog.service";
import {Injector, ApplicationRef, ComponentFactoryResolver} from "@angular/core";
export function dialogProvider(container: HTMLElement) {
    return { provide:DialogService,
        useFactory: (resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector) => {
            const dialogService = new DialogService(resolver, applicationRef, injector);
            dialogService.setCointainer(container);
            return dialogService;
        },
        deps: [ComponentFactoryResolver, ApplicationRef, Injector]
    }
}