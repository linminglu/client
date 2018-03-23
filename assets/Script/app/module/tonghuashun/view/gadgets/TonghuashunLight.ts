import GameLight from "../../../game/view/gadgets/GameLight"
import { GameManager } from "../../../../common/manager/GameManager"
const {ccclass, property} = cc._decorator;

@ccclass
export default class TonghuashunLight extends GameLight {

    onLoad() {
        super.onLoad()

        this.node.active = false

        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
    }

    onDestroy() {
        super.onDestroy()

        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
    }

    onEnable() {
        super.lightEffectFun(3) //最大个数
    }

    private startBetFun(eventName: string, remainTime: number = 0, endTime: number) {
        this.node.active = remainTime > 0
    }
}
