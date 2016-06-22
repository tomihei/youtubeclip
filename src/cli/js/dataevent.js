/// <reference path="../../../typings/browser.d.ts"/>
define(["require", "exports", "jquery", "./view", "./ydata", "./inputvalid", "./sendydata"], function (require, exports, $, View, DataTrans, Valid, SendData) {
    "use strict";
    var Eventlisten = (function () {
        function Eventlisten() {
            var _this = this;
            this.resultList = new View.List($("#searchresult"));
            this.yajaxData = new DataTrans.YoutubeData();
            this.urlValid = new Valid.UrlValid();
            this.playDouga = new SendData.SendData();
            // Ajax成功時resultListにデータを送る
            this.yajaxData.onEvent = function (evt, response) {
                switch (evt) {
                    case "response":
                        if (response.pageInfo.totalResults === 0) {
                            _this.resultList.delData();
                        }
                        else {
                            _this.resultList.delData();
                            _this.resultList.createDom(response);
                            _this.resultList.writeDom();
                        }
                        ;
                        break;
                    case "error":
                        alert(response);
                        break;
                }
                ;
            };
            this.seachEvent();
            this.dougaEvent();
            this.rangeinput();
        }
        Eventlisten.prototype.seachEvent = function () {
            // 検索ボタン
            var othis = this;
            $("#moviesearch").on("click", function () {
                othis.yajaxData.getData($("#movietitle").val());
            });
            // 検索結果をクリックしたら動画読み込み
            $("#searchresult").on("click", ".list-group-item", function () {
                $("html,body").animate({ scrollTop: $("#urltext").offset().top });
                var durl = $(this).attr("data-title");
                $("#urltext").val(durl);
                othis.playDouga.startBind(durl);
            });
        };
        Eventlisten.prototype.dougaEvent = function () {
            var _this = this;
            this.playDouga.rangeSet($("#startpoint"), $("#endpoint"));
            $("#urlsend").on("click", function () {
                var data = $("#urltext").val();
                // 入力されたURLのバリデーション
                _this.urlValid.startValid(data);
                // チェック成功ならIDだけ取り出して動画再生
                if (_this.urlValid.onerror === false) {
                    _this.playDouga.startBind(data.substr(-11));
                }
                ;
            });
        };
        Eventlisten.prototype.rangeinput = function () {
            // input値変更
            $("#startpoint").on("input", function () {
                var min = $("#startpoint").val() / 60;
                var sec = $("#startpoint").val() % 60;
                $("#startparam").text(Math.floor(min) + ":" + ("0" + sec).slice(-2));
            });
            $("#endpoint").on("input", function () {
                var min = $("#endpoint").val() / 60;
                var sec = $("#endpoint").val() % 60;
                $("#endparam").text(Math.floor(min) + ":" + ("0" + sec).slice(-2));
            });
        };
        return Eventlisten;
    }());
    exports.Eventlisten = Eventlisten;
});
