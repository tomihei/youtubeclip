import Ybase = require("./yoperater");
import $ = require("jquery");

export class SendData {
    private rangeS;
    private rangeE;
    private yplay;
    constructor() {
      this.yplay = new Ybase();
    }
    public startBind(etitle: string) {
        // 動画IDを登録
        this.yplay.setTitle(etitle);
        // レンジインプットを０に
        this.rangeS.val(0);
        this.rangeE.val(0);
        // 動画読み込み
        this.yplay.loadVideo();
        // 動画の長さを取得
        setTimeout(() => { this.duration(); }, 1000);
        // レンジインプット調節
        this.rangeBind();
    }
    public rangeSet(str: JQuery, end: JQuery) {
      this.rangeS = str;
      this.rangeE = end;
    }
    /*  動画の長さでレンジインプットの値を変える */
    private duration() {
        let endt = this.yplay.getDuration();
        this.rangeS.attr({ max: endt });
        if (endt < 60) {
            this.rangeE.attr({ max: endt, 　value: endt });
        }
    }
    /*　レンジインプット関連　*/
    private rangeBind() {
        this.rangeS.on("change", () => {
            this.yplay.setStarts(this.rangeS.val());
            this.yplay.bindVideoParam();
            let endsec: number = parseInt(this.rangeS.val(), 10) + 60;
            this.rangeE.attr({
                min: this.rangeS.val(),
                max: endsec,
            });
        });
        this.rangeE.on("change", () => {
            this.yplay.setEnds(this.rangeE.val());
            this.yplay.bindVideoParam();
            this.yplay.onPlay();
        });

    }
}
