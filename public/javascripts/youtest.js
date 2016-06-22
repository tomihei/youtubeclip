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
