import GameBetArea from "../../../game/view/gadgets/GameBetArea"

const { ccclass, property } = cc._decorator

@ccclass
export default class NiuniuBetArea extends GameBetArea {
    protected childMaxNum = 6         //区域最大个数

    onLoad() {
        super.onLoad()
        super.setChildMaxNum(this.childMaxNum)
    }

    onDestroy() {
        super.onDestroy()
    }
}
