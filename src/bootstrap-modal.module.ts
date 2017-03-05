import { NgModule, ModuleWithProviders, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DialogHolderComponent } from "./dialog-holder.component";
import { DialogWrapperComponent } from "./dialog-wrapper.component";
import { DialogService, DialogServiceConfig } from "./dialog.service";
/**
 * Dialog service factory. Creates dialog service with options
 * @param { ComponentFactoryResolver } resolver
 * @param { ApplicationRef } applicationRef
 * @param { Injector } injector
 * @param { DialogServiceConfig } options
 * @return { DialogService }
 */
export function dialogServiceFactory(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, options: DialogServiceConfig) {
    return new DialogService(resolver, applicationRef, injector, options);
}

@NgModule({
    declarations: [
        DialogHolderComponent,
        DialogWrapperComponent
    ],
    providers: [
        DialogService
    ],
    imports: [
        CommonModule
    ],
    entryComponents: [
        DialogHolderComponent,
        DialogWrapperComponent
    ]
})
export class BootstrapModalModule {
    static forRoot(config: DialogServiceConfig): ModuleWithProviders {
        return {
            ngModule: BootstrapModalModule,
            providers: [
                {provide: DialogServiceConfig, useValue:config},
                {
                    provide: DialogService,
                    useFactory: dialogServiceFactory,
                    deps: [ComponentFactoryResolver, ApplicationRef, Injector, DialogServiceConfig]
                }
            ]
        };
    }
}


