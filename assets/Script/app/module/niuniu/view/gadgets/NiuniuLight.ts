
import GameLight from "../../../game/view/gadgets/GameLight"
import { GameManager } from "../../../../common/manager/GameManager"

const { ccclass, property } = cc._decorator

@ccclass
export default class NiuniuLight extends GameLight {
    onLoad() {
        super.onLoad()

        this.node.active = false
    }

    onDestroy() {
        super.onDestroy()
    }

    onEnable() {
        super.onEnable()
        super.lightEffectFun(2) //最大个数
    }
}
