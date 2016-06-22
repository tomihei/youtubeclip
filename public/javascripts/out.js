"use strict";
var $ = require('./components/jquery/dist/jquery.min.js');
var tag = document.createElement("script");
tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        events: {
            "onReady": onPlayerReady,
        },
    });
}
function onPlayerReady(event) {
    var playDouga = new YoutubeClass(player);
    playDouga.onPlay("qpgTC9MDx1o", 5, 15);
}
$('div#startpoint').val(70);

var YoutubeClass = (function () {
    function YoutubeClass(yplay) {
        this.yplay = yplay;
    }
    ;
    YoutubeClass.prototype.onPlay = function (title, starts, ends) {
        this.yplay.loadVideoById({
            videoId: title,
            startSeconds: starts,
            endSeconds: ends,
        });
        this.yplay.playVideo();
    };
    return YoutubeClass;
}());
