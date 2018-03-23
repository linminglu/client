
import { GameManager } from "../../../../common/manager/GameManager"
import { GameCfg } from "../../../../../GameConfig"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(-1)
export default class GameLight extends cc.Component {
    private sequence = []
    private childMaxNum = 0
    private myzhang = 0

    onLoad() {
        this.node.active = false

        Emitter.register(EmitterCfg.GAME_ROB_ZHUANG, this.lianZhunFun, this)
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GAME_ROB_ZHUANG, this.lianZhunFun, this)
    }

    onEnable() {
        this.lightEffectFun()
    }

    onDisable() {
    }

    lianZhunFun(eventName: string, args1) {
        this.myzhang = args1
        if (this.myzhang == 0) {
            return
        }

        this.node.active = args1 == 0
    }

    protected lightEffectFun(maxNum: number = 0, grap: number = 1) {
        if (maxNum <= 0) {
            return
        }

        this.node.active = this.myzhang == 0

        this.childMaxNum = maxNum

        let self = this
        let anmiAct = function (idx) {
            let nodeName = "lightArea" + idx
            let node = self.node.getChildByName(nodeName)
            if (cc.isValid(node)) {
                node.opacity = 0
                self.sequence[idx] = cc.sequence(cc.fadeIn(1), cc.delayTime(0.5), cc.fadeOut(1), cc.delayTime(0.5), cc.callFunc(function () {
                    node.opacity = 0

                    idx = idx + grap
                    if (idx > maxNum) {
                        idx = 1
                    }

                    anmiAct(idx)
                }))
                node.runAction(self.sequence[idx])
            }
        }

        for (let i = 1; i <= maxNum; i++) {
            let node = self.node.getChildByName("lightArea" + i)
            if (cc.isValid(node)) {
                node.opacity = 0
                if (this.sequence[i] && cc.isValid(node)) {
                    node.stopAction(this.sequence[i])
                }
            }
        }

        anmiAct(1)
    }
}
