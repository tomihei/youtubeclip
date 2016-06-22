/// <reference path="../../../typings/browser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "validator"], function (require, exports, valid) {
    "use strict";
    var InputClass = (function () {
        function InputClass(data) {
            this.data = data;
            this.mess = [];
            this.onerror = false;
        }
        ;
        // 入力文字数確認
        InputClass.prototype.Length = function (minl, maxl) {
            if (valid.isLength(this.data, { min: minl, max: maxl })) {
                this.onerror = false;
                return this;
            }
            else {
                this.mess.push("文字数エラー");
                this.onerror = true;
            }
        };
        return InputClass;
    }());
    var UrlValid = (function (_super) {
        __extends(UrlValid, _super);
        function UrlValid() {
            _super.apply(this, arguments);
        }
        UrlValid.prototype.startValid = function (vdata) {
            this.data = vdata;
            _super.prototype.Length.call(this, 10, 50);
        };
        return UrlValid;
    }(InputClass));
    exports.UrlValid = UrlValid;
});
