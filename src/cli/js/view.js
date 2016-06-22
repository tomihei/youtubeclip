define(["require", "exports"], function (require, exports) {
    "use strict";
    var List = (function () {
        function List(target) {
            this.target = target;
            this.listdata = [];
        }
        List.prototype.writeDom = function () {
            this.target[0].innerHTML = this.listdata.join("");
        };
        List.prototype.createDom = function (data) {
            for (var i in data.items) {
                this.listdata[i] = "<a class='list-group-item' data-title='"
                    + data.items[i].id.videoId + "'>"
                    + "<div class='search-list-thumbdiv'>"
                    + "<img class='search-list-thumb' src='"
                    + data.items[i].snippet.thumbnails.default.url + "'>"
                    + "</div>"
                    + "<div class='search-list-text'>"
                    + "<h4 class=#list-group-item-heading>"
                    + data.items[i].snippet.title
                    + "</h4>"
                    + "<p class='list-group-item-text'>"
                    + data.items[i].snippet.description
                    + "</p>"
                    + "</div>"
                    + "</a>";
            }
            ;
        };
        List.prototype.delData = function () {
            this.target.empty();
        };
        return List;
    }());
    exports.List = List;
});
