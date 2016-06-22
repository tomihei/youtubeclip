define(["require", "exports"], function (require, exports) {
    "use strict";
    /// <reference path= "../../../typings/browser.d.ts" />
    var YoutubeClass;
    (function (YoutubeClass) {
        var Ybase = (function () {
            function Ybase(yplay) {
                this.yplay = yplay;
            }
            ;
            // 動画情報のみ取得
            Ybase.prototype.bindVideoParam = function () {
                this.yplay.cueVideoById({
                    videoId: this.title,
                    startSeconds: this.starts,
                    endSeconds: this.ends,
                });
            };
            // 動画情報を取得して再生
            Ybase.prototype.loadVideo = function () {
                this.yplay.loadVideoById({
                    videoId: this.title,
                    startSeconds: 0,
                });
            };
            Ybase.prototype.onPlay = function () {
                this.yplay.playVideo();
            };
            Ybase.prototype.setTitle = function (title) {
                this.title = title;
            };
            Ybase.prototype.setStarts = function (st) {
                this.starts = st;
            };
            Ybase.prototype.setEnds = function (et) {
                this.ends = et;
            };
            return Ybase;
        }());
        YoutubeClass.Ybase = Ybase;
    })(YoutubeClass || (YoutubeClass = {}));
    return YoutubeClass;
});
