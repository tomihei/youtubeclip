/// <reference path="../../../typings/index.d.ts"/>
define(["require", "exports", "jquery", "./dataevent"], function (require, exports, $, Event) {
    "use strict";
    $(document).ready(function () {
        // 動画検索
        var seachEvent = new Event.Eventlisten;
        // socketio TEST
        var socket = io();
        $(".chatsend").click(function () {
            socket.emit("chat message", $(".chatform").val());
            $(".chatform").val("");
            return false;
        });
        socket.on("chat message", function (msg) {
            $("#message").append($("<li>").text(msg));
        });
    });
});
