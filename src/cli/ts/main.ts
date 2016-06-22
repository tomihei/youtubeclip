/// <reference path="../../../typings/index.d.ts"/>

import $ = require("jquery");
import * as Event from "./dataevent";

$(document).ready(function() {
    // 動画検索
    let seachEvent = new Event.Eventlisten;
    // socketio TEST
    let socket = io();
    $(".chatsend").click(function(){
      socket.emit("chat message", $(".chatform").val());
      $(".chatform").val("");
      return false;
    });
    socket.on("chat message", function(msg){
      $("#message").append($("<li>").text(msg));
    });
});
