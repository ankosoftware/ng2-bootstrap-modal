"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dialog_holder_component_1 = require("./dialog-holder.component");
var dialog_wrapper_component_1 = require("./dialog-wrapper.component");
var dialog_service_1 = require("./dialog.service");
var BootstrapModalModule = (function () {
    function BootstrapModalModule() {
    }
    return BootstrapModalModule;
}());
BootstrapModalModule = __decorate([
    core_1.NgModule({
        declarations: [
            dialog_holder_component_1.DialogHolderComponent,
            dialog_wrapper_component_1.DialogWrapperComponent
        ],
        providers: [
            dialog_service_1.DialogService
        ],
        imports: [
            common_1.CommonModule
        ],
        entryComponents: [
            dialog_holder_component_1.DialogHolderComponent,
            dialog_wrapper_component_1.DialogWrapperComponent
        ]
    })
], BootstrapModalModule);
exports.BootstrapModalModule = BootstrapModalModule;
//# sourceMappingURL=bootstrap-modal.module.js.map