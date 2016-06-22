/// <reference path="../../../typings/browser.d.ts"/>

import $ = require("jquery");

interface AjaxTrans {
  onEvent: Function;
  getData(query: string);
  Ajax(query: string);
}

abstract class DataTrans implements AjaxTrans {
  public onEvent: Function;
  // YoutubeDataAPIからデータ取得
  public getData (query: string) {
    let getJson = this.Ajax(query);
    // 成功時
    // どっちもJSONデータ
    getJson.done((response) => {
      this.onEvent.call(this, "response", response);
    });
    // 失敗時
    getJson.fail((e) => {
      this.onEvent.call(this, "error", e);
    });
  }
  public abstract Ajax (query: string);
}
export class YoutubeData extends DataTrans {
  public Ajax (query: string, sort = "relevance", pageToken = ""): JQueryXHR {
    let jqXHR = $.ajax({
      type: "GET",
      url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
           query + "&type=video&videoEmbeddable=true&maxResults=10&order=" +
           sort  +
           pageToken + "&key=AIzaSyBmuFhd8CjL21ebK_5bPHasZBhVk7NWRbQ",
      dataType: "json",
    });
    return jqXHR;
  }
}
