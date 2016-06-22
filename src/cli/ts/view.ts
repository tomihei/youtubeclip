interface Views {
    onEvent: Function;
    writeDom(): void;
    delData(): void;
}

export class List implements Views {
    public onEvent: Function;
    private listdata: string[] = [];
    constructor(private target: JQuery) { }

    public writeDom(): void {
        this.target[0].innerHTML = this.listdata.join("");
    }
    public createDom(data: any): void {
        for (let i in data.items) {
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
        };
    }
    public delData(): void {
      this.target.empty();
    }
}
