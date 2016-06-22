define(["require", "exports", "./yoperater"], function (require, exports, Ybase) {
    "use strict";
    var SendData = (function () {
        function SendData() {
            this.yplay = new Ybase();
        }
        SendData.prototype.startBind = function (etitle) {
            var _this = this;
            // 動画IDを登録
            this.yplay.setTitle(etitle);
            // レンジインプットを０に
            this.rangeS.val(0);
            this.rangeE.val(0);
            // 動画読み込み
            this.yplay.loadVideo();
            // 動画の長さを取得
            setTimeout(function () { _this.duration(); }, 1000);
            // レンジインプット調節
            this.rangeBind();
        };
        SendData.prototype.rangeSet = function (str, end) {
            this.rangeS = str;
            this.rangeE = end;
        };
        /*  動画の長さでレンジインプットの値を変える */
        SendData.prototype.duration = function () {
            var endt = this.yplay.getDuration();
            this.rangeS.attr({ max: endt });
            if (endt < 60) {
                this.rangeE.attr({ max: endt, value: endt });
            }
        };
        /*　レンジインプット関連　*/
        SendData.prototype.rangeBind = function () {
            var _this = this;
            this.rangeS.on("change", function () {
                _this.yplay.setStarts(_this.rangeS.val());
                _this.yplay.bindVideoParam();
                var endsec = parseInt(_this.rangeS.val(), 10) + 60;
                _this.rangeE.attr({
                    min: _this.rangeS.val(),
                    max: endsec,
                });
            });
            this.rangeE.on("change", function () {
                _this.yplay.setEnds(_this.rangeE.val());
                _this.yplay.bindVideoParam();
                _this.yplay.onPlay();
            });
        };
        return SendData;
    }());
    exports.SendData = SendData;
});
