
import GameBetArea from "../../../game/view/gadgets/GameBetArea"
const {ccclass, property} = cc._decorator;

@ccclass
export default class TonghuashunBetArea extends GameBetArea {
    protected childMaxNum = 3         //区域最大个数
    
    onLoad() {
        super.onLoad()
        super.setChildMaxNum(this.childMaxNum)
    }

    onDestroy() {
        super.onDestroy();
    }
}
