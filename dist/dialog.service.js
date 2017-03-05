"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_holder_component_1 = require("./dialog-holder.component");
var DialogServiceConfig = (function () {
    function DialogServiceConfig() {
        this.container = null;
    }
    return DialogServiceConfig;
}());
exports.DialogServiceConfig = DialogServiceConfig;
var DialogService = (function () {
    function DialogService(resolver, applicationRef, injector, config) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
        this.container = config && config.container;
    }
    DialogService.prototype.addDialog = function (component, data, options) {
        if (!this.dialogHolderComponent) {
            this.dialogHolderComponent = this.createDialogHolder();
        }
        return this.dialogHolderComponent.addDialog(component, data, options);
    };
    DialogService.prototype.removeDialog = function (component) {
        if (!this.dialogHolderComponent) {
            return;
        }
        this.dialogHolderComponent.removeDialog(component);
    };
    DialogService.prototype.removeAll = function () {
        this.dialogHolderComponent.clear();
    };
    DialogService.prototype.createDialogHolder = function () {
        var _this = this;
        var componentFactory = this.resolver.resolveComponentFactory(dialog_holder_component_1.DialogHolderComponent);
        var componentRef = componentFactory.create(this.injector);
        var componentRootNode = componentRef.hostView.rootNodes[0];
        if (!this.container) {
            var componentRootViewContainer = this.applicationRef['_rootComponents'][0];
            this.container = componentRootViewContainer.hostView.rootNodes[0];
        }
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            _this.applicationRef.detachView(componentRef.hostView);
        });
        this.container.appendChild(componentRootNode);
        return componentRef.instance;
    };
    return DialogService;
}());
DialogService = __decorate([
    core_1.Injectable(),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, core_1.ApplicationRef, core_1.Injector, DialogServiceConfig])
], DialogService);
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map