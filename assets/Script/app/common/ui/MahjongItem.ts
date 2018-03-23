
import { ResConfig as ResCfg } from "../../common/util/ResConfig"
import {FuncUtil} from "../util/FuncUtil"

const {ccclass, property} = cc._decorator;

@ccclass
export default class MahjongItem extends cc.Component {


    brandItemFun(value){
        let sprcake=this.node.getChildByName("sprcake")
        ResCfg.loadPlist(this, "txt_card", function (self, Asste) {
            let sprites=Asste.getSpriteFrame("mahjong-icon_cake_" + value);
            sprcake.getComponent(cc.Sprite).spriteFrame=sprites;
        })
    }
}
