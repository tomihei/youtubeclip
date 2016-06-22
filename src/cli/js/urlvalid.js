var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./inputvalid"], function (require, exports, invalid) {
    "use strict";
    var UrlValid = (function (_super) {
        __extends(UrlValid, _super);
        function UrlValid() {
            _super.apply(this, arguments);
        }
        UrlValid.prototype.startValid = function (vdata) {
            this.data = vdata;
            _super.prototype.Length.call(this, 10, 50);
            if (this.onerror) {
                _super.prototype.message.call(this);
            }
        };
        return UrlValid;
    }(invalid.InputClass));
    return UrlValid;
});
