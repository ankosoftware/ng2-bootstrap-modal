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
var core_1 = require("@angular/core");
var DialogWrapperComponent = (function () {
    function DialogWrapperComponent(resolver) {
        this.resolver = resolver;
    }
    DialogWrapperComponent.prototype.addComponent = function (component) {
        var factory = this.resolver.resolveComponentFactory(component);
        var injector = core_1.ReflectiveInjector.fromResolvedProviders([], this.element.injector);
        var componentRef = factory.create(injector);
        this.element.insert(componentRef.hostView);
        this.content = componentRef.instance;
        this.content.wrapper = this;
        return this.content;
    };
    return DialogWrapperComponent;
}());
__decorate([
    core_1.ViewChild('element', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], DialogWrapperComponent.prototype, "element", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", Object)
], DialogWrapperComponent.prototype, "container", void 0);
DialogWrapperComponent = __decorate([
    core_1.Component({
        selector: 'dialog-wrapper',
        template: "\n  <div #container class=\"modal fade\" style=\"display:block !important;\" role=\"dialog\">\n    <div class=\"modal-dialog\">\n      <template #element></template>\n    </div>\n  </div>\n  "
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], DialogWrapperComponent);
exports.DialogWrapperComponent = DialogWrapperComponent;
//# sourceMappingURL=dialog-wrapper.component.js.map