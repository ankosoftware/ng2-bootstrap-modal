"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var DialogComponent = (function () {
    function DialogComponent(dialogService) {
        this.dialogService = dialogService;
    }
    DialogComponent.prototype.fillData = function (data) {
        var _this = this;
        data = data || {};
        var keys = Object.keys(data);
        for (var i = 0, length_1 = keys.length; i < length_1; i++) {
            var key = keys[i];
            this[key] = data[key];
        }
        return rxjs_1.Observable.create(function (observer) {
            _this.observer = observer;
            return function () {
                _this.close();
            };
        });
    };
    DialogComponent.prototype.close = function () {
        this.dialogService.removeDialog(this);
    };
    DialogComponent.prototype.ngOnDestroy = function () {
        if (this.observer) {
            this.observer.next(this.result);
        }
    };
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;
//# sourceMappingURL=dialog.component.js.map