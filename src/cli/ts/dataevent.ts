/// <reference path="../../../typings/browser.d.ts"/>

import $ = require("jquery");
import * as View from "./view";
import * as DataTrans from "./ydata";
import * as Valid from "./inputvalid";
import * as SendData from "./sendydata";

export class Eventlisten {
    private resultList: View.List;
    private yajaxData: DataTrans.YoutubeData;
    private urlValid: Valid.UrlValid;
    private playDouga: SendData.SendData;
    constructor() {
        this.resultList = new View.List($("#searchresult"));
        this.yajaxData = new DataTrans.YoutubeData();
        this.urlValid = new Valid.UrlValid();
        this.playDouga = new SendData.SendData();
        // Ajax成功時resultListにデータを送る
        this.yajaxData.onEvent = (evt: string, response: any) => {
            switch (evt) {
                case "response":
                    if (response.pageInfo.totalResults === 0) {
                        this.resultList.delData();
                    } else {
                        this.resultList.delData();
                        this.resultList.createDom(response);
                        this.resultList.writeDom();
                    };
                    break;
                case "error":
                    alert(response);
                    break;
            };
        };
        this.seachEvent();
        this.dougaEvent();
        this.rangeinput();
    }
    private seachEvent() {
        // 検索ボタン
        let othis = this;
        $("#moviesearch").on("click", function()  {
            othis.yajaxData.getData($("#movietitle").val());
        });
        // 検索結果をクリックしたら動画読み込み
        $("#searchresult").on("click", ".list-group-item", function() {
            $("html,body").animate({ scrollTop: $("#urltext").offset().top });
            let durl = $(this).attr("data-title");
            $("#urltext").val(durl);
            othis.playDouga.startBind(durl);
        });
    }

    private dougaEvent() {
        this.playDouga.rangeSet($("#startpoint"), $("#endpoint"));

        $("#urlsend").on("click", () => {
            let data: string = $("#urltext").val();
            // 入力されたURLのバリデーション
            this.urlValid.startValid(data);
            // チェック成功ならIDだけ取り出して動画再生
            if (this.urlValid.onerror === false) {
                this.playDouga.startBind(data.substr(-11));
            };
        }
        );
    }
    private rangeinput() {
      // input値変更
      $("#startpoint").on("input", () => {
          let min = $("#startpoint").val() / 60;
          let sec = $("#startpoint").val() % 60;
          $("#startparam").text(Math.floor(min) + ":" + ("0" + sec).slice(-2));
      });
      $("#endpoint").on("input", () => {
          let min = $("#endpoint").val() / 60;
          let sec = $("#endpoint").val() % 60;
          $("#endparam").text(Math.floor(min) + ":" + ("0" + sec).slice(-2));
      });

    }
}
