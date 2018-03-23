import { ResConfig as ResCfg } from "../../common/util/ResConfig"
import {FuncUtil} from "../util/FuncUtil"

const { ccclass, property } = cc._decorator;
@ccclass
export default class BrandItem extends cc.Component {

    brandItemFun(value,bool:boolean=true) {
        if (!cc.isValid(this.node)) return;
        let data = FuncUtil.parsCard(value)
        this.node.getChildByName("sprBack").active=bool;
        this.node.getChildByName("sprBack").scaleX=1;

        ResCfg.loadPlist(this, "txt_card", function (self, Asste) {
        
            let color = data.Color + 4;
            let Floret = Asste.getSpriteFrame("txt_card-icon_logo_" + color);
            let Color = data.Color;
            let Bigflower = Asste.getSpriteFrame("txt_card-icon_logo_" + Color);
            let txtNum=null;
            let num = data.num;
            if (data.Color % 2 == 0) { 
                txtNum = Asste.getSpriteFrame("txt_card-txt_card_red_" + num);
            }
            else {
                txtNum = Asste.getSpriteFrame("txt_card-txt_card_black_" + num);
            }
            let nodeBg=null;
            if (cc.isValid(self.node)) {
                nodeBg=self.node.getChildByName("sprBg");
            }
            if(!cc.isValid(nodeBg))return;
            nodeBg.getChildByName("lblNum").getComponent(cc.Sprite).spriteFrame = txtNum
            nodeBg.getChildByName("sprFloret").getComponent(cc.Sprite).spriteFrame = Floret
            nodeBg.getChildByName("sprBigFlower").getComponent(cc.Sprite).spriteFrame = Bigflower

        })
    }
}
