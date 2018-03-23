import GameCompare from "../../../game/view/gadgets/GameCompare"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../config/EmitterConfig"

const { ccclass, property } = cc._decorator

@ccclass
export default class NiuniuCompare extends GameCompare {

    protected xianNum:number = 3; //几个闲家
    //牌类型
    protected typepk = ["无牛", "牛一", "牛二", "牛三", "牛四", "牛五", "牛六", "牛七", "牛八", "牛九", "牛牛","四炸", "五小牛"]

    onLoad() {
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }
    
    
}