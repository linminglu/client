import { ResConfig as ResCfg } from "../../common/util/ResConfig";
import { FuncUtil } from "../util/FuncUtil"
const { ccclass, property } = cc._decorator;
@ccclass
export default class FramBrandBg extends cc.Component {

    @property(cc.Sprite)
    txt_brand_0: cc.Sprite = null
    @property(cc.Sprite)
    txt_brand_1: cc.Sprite = null

    updateItemBallFun(dataNum: number, bool: boolean = false) {
        let data = FuncUtil.getNum2Obj(dataNum)//this.upDataBreak(dataNum);
        
        this.node.getChildByName("sprBright").active=bool
        ResCfg.loadPlist(this, "common", function (self, atlas, plistName) {
            if (cc.isValid(self.txt_brand_0)) {
                self.txt_brand_0.spriteFrame = atlas.getSpriteFrame(`colourBall-txt_brand_${data.shi}`);
            }
            
            if (cc.isValid(self.txt_brand_1)) {
                self.txt_brand_1.spriteFrame = atlas.getSpriteFrame(`colourBall-txt_brand_${data.ge}`);
            }
        });
 
    }
    upDataBreak(number: number) {
        let data = {
            shi: null,
            ge: null
        }
        data.shi = parseInt(number / 10 + '').toString();
        data.ge = (number % 10).toString();
        return data
    }

}
