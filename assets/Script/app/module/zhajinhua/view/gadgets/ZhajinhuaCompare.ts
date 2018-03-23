
import GameCompare from "../../../game/view/gadgets/GameCompare"
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZhajinhuaCompare extends GameCompare {

    protected xianNum:number = 3; //几个闲家
    //牌类型
    protected typepk = ["单张", "对子", "顺子", "金花","顺金","豹子"]

    onLoad() {
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }
}
