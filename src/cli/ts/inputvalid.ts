/// <reference path="../../../typings/browser.d.ts"/>

import valid = require("validator");

class InputClass {
    public mess: string[] = [];
    public onerror: boolean = false;
    public onEvent: Function;
    constructor(public data?: string) { };
    // 入力文字数確認
    public Length(minl: number, maxl: number) {
        if (valid.isLength(this.data, { min: minl, max: maxl })) {
            this.onerror = false;
            return this;
        } else {
            this.mess.push("文字数エラー");
            this.onerror = true;
        }
    }
}
export class UrlValid extends InputClass {
  public startValid(vdata: string) {
    this.data = vdata;
    super.Length(10, 50);
  }
}
