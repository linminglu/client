import GameCompare from "../../../game/view/gadgets/GameCompare"


const { ccclass, property } = cc._decorator

@ccclass
export default class XiaojiuCompare extends GameCompare {

    protected xianNum:number = 3; //几个闲家
    //牌类型
    protected typepk = ["零点", "一点", "两点", "三点", "四点", "五点", "六点", "七点", "八点", "九点", "","对一", "对二", "对三", "对四", "对五", "对六", "对七", "对八", "对九", "对十"]

    onLoad() {
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }
}