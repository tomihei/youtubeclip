/// <reference path= "../../../typings/browser.d.ts" />

class YBase {

        private title: string;
        private starts: number;
        private ends: number;
        private yplay: any;
        constructor() {
          this.loadYPlayer();
        };
        // 動画情報のみ取得
        public bindVideoParam(): void {
            this.yplay.cueVideoById({
                videoId: this.title,
                startSeconds: this.starts,
                endSeconds: this.ends,
            });
        }
        // 動画情報を取得して再生
        public loadVideo(): void {
            this.yplay.loadVideoById({
                videoId: this.title,
                startSeconds: 0,
            });
        }
        public onPlay(): void {
            this.yplay.playVideo();
        }
        public getDuration(): number {
            return this.yplay.getDuration();
        }
        public setTitle(ti: string): void {
            this.title = ti;
        };
        public setStarts(st: number): void {
            this.starts = st;
        }
        public setEnds(et: number): void {
            this.ends = et;
        }
        private loadYPlayer(): void {

          let tag = document.createElement("script");

          tag.src = "http://www.youtube.com/iframe_api";
          let firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          window.onYouTubeIframeAPIReady = () => {
              this.yplay = new YT.Player("testplay", {
                  height: "390",
                  width: "640",
              });
          };

        }
}

export = YBase;
