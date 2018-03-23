import GameCompare from "../../../game/view/gadgets/GameCompare"


const { ccclass, property } = cc._decorator

@ccclass
export default class ErbagangCompare extends GameCompare {

    protected xianNum:number = 3; //几个闲家
    //牌类型
    protected typepk = ["鳖十", "一点", "两点", "三点", "四点", "五点", "六点", "七点", "八点", "九点", "二八杠","一筒对子", "二筒对子", "三筒对子", "四筒对子", "五筒对子", "六筒对子", "七筒对子", "八筒对子", "九筒对子","白板对子"]

    onLoad() {
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }
}