/// <reference path= "../../../typings/browser.d.ts" />
define(["require", "exports"], function (require, exports) {
    "use strict";
    var YBase = (function () {
        function YBase() {
            this.loadYPlayer();
        }
        ;
        // 動画情報のみ取得
        YBase.prototype.bindVideoParam = function () {
            this.yplay.cueVideoById({
                videoId: this.title,
                startSeconds: this.starts,
                endSeconds: this.ends,
            });
        };
        // 動画情報を取得して再生
        YBase.prototype.loadVideo = function () {
            this.yplay.loadVideoById({
                videoId: this.title,
                startSeconds: 0,
            });
        };
        YBase.prototype.onPlay = function () {
            this.yplay.playVideo();
        };
        YBase.prototype.getDuration = function () {
            return this.yplay.getDuration();
        };
        YBase.prototype.setTitle = function (ti) {
            this.title = ti;
        };
        ;
        YBase.prototype.setStarts = function (st) {
            this.starts = st;
        };
        YBase.prototype.setEnds = function (et) {
            this.ends = et;
        };
        YBase.prototype.loadYPlayer = function () {
            var _this = this;
            var tag = document.createElement("script");
            tag.src = "http://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = function () {
                _this.yplay = new YT.Player("testplay", {
                    height: "390",
                    width: "640",
                });
            };
        };
        return YBase;
    }());
    return YBase;
});
