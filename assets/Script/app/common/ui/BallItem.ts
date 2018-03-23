import { ResConfig as ResCfg } from "../../common/util/ResConfig"
import { FuncUtil } from "../util/FuncUtil"

const { ccclass, property } = cc._decorator

@ccclass
export default class BallItem extends cc.Component {

    @property(cc.Sprite)
    sprFirst: cc.Sprite = null

    @property(cc.Sprite)
    sprSecond: cc.Sprite = null

    data = null
    
    updateItemBallFun(dataNum: number, isShowBg: boolean = true) {
        let data = FuncUtil.getNum2Obj(dataNum);
        ResCfg.loadPlist(this, "common", function (self, atlas, plistName) {
            if (cc.isValid(self.sprFirst) && data && data.shi) {
                self.sprFirst.spriteFrame = atlas.getSpriteFrame(`colourBall-txt_brand_${data.shi}`)
            }

            if (cc.isValid(self.sprSecond) && data && data.ge) {
                self.sprSecond.spriteFrame = atlas.getSpriteFrame(`colourBall-txt_brand_${data.ge}`)
            }

            self.data = data
        })
    }
}
