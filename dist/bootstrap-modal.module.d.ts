import { ModuleWithProviders, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { DialogService, DialogServiceConfig } from "./dialog.service";
export declare function dialogServiceFactory(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, options: DialogServiceConfig): DialogService;
export declare class BootstrapModalModule {
    static forRoot(config: DialogServiceConfig): ModuleWithProviders;
}
