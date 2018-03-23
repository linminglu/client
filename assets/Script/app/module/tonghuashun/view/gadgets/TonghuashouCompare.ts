import GameCompare from "../../../game/view/gadgets/GameCompare"
const {ccclass, property} = cc._decorator;

@ccclass
export default class TonghuashouCompare extends GameCompare {

   
    protected xianNum:number = 3; //几个闲家
    //牌类型
    protected typepk = ["", "高牌", "一对", "两对", "三条", "顺子", "同花", "葫芦", "四条", "同花顺", "同花大顺"]

    onLoad() {
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }
}
