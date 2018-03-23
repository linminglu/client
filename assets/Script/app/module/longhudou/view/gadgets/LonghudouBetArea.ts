import GameBetArea from "../../../game/view/gadgets/GameBetArea"

const { ccclass, property } = cc._decorator

@ccclass
export default class LonghudouBetArea extends GameBetArea {
    protected childMaxNum = 7         //区域最大个数

    onLoad() {
        super.onLoad()
        super.setChildMaxNum(this.childMaxNum)
    }

    onDestroy() {
        super.onDestroy()
    }
}
