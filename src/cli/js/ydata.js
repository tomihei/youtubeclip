/// <reference path="../../../typings/browser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    var DataTrans = (function () {
        function DataTrans() {
        }
        // YoutubeDataAPIからデータ取得
        DataTrans.prototype.getData = function (query) {
            var _this = this;
            var getJson = this.Ajax(query);
            // 成功時
            // どっちもJSONデータ
            getJson.done(function (response) {
                _this.onEvent.call(_this, "response", response);
            });
            // 失敗時
            getJson.fail(function (e) {
                _this.onEvent.call(_this, "error", e);
            });
        };
        return DataTrans;
    }());
    var YoutubeData = (function (_super) {
        __extends(YoutubeData, _super);
        function YoutubeData() {
            _super.apply(this, arguments);
        }
        YoutubeData.prototype.Ajax = function (query, sort, pageToken) {
            if (sort === void 0) { sort = "relevance"; }
            if (pageToken === void 0) { pageToken = ""; }
            var jqXHR = $.ajax({
                type: "GET",
                url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
                    query + "&type=video&videoEmbeddable=true&maxResults=10&order=" +
                    sort +
                    pageToken + "&key=AIzaSyBmuFhd8CjL21ebK_5bPHasZBhVk7NWRbQ",
                dataType: "json",
            });
            return jqXHR;
        };
        return YoutubeData;
    }(DataTrans));
    exports.YoutubeData = YoutubeData;
});
