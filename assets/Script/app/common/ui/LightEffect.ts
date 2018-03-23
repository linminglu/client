const { ccclass, property } = cc._decorator;

@ccclass
export default class LightEffect extends cc.Component {
    sequence = []

    onLoad() {
        // init logic

    }

    lightEffectFun(epx, Flash) {
        let self = this
        let anmiAct = function (idx) {
            let nodeName = "sprlight" + idx
            let node = self.node.getChildByName(nodeName)
            node.opacity = 0
            self.sequence[idx] = cc.sequence(cc.fadeIn(1), cc.delayTime(0.2), cc.fadeOut(1), cc.delayTime(0.2), cc.callFunc(function () {
                node.opacity = 0
                idx = idx - Flash
                if (idx == 0) {
                    idx = epx
                } else if (idx == -1) {
                    idx = epx - 1
                }
                anmiAct(idx)
            }))
            node.runAction(self.sequence[idx])
        }
       
        for (let i = 1; i <= epx; i++) {
            let node = this.node.getChildByName("sprlight" + i)
            node.opacity = 0
            if (this.sequence[i] && cc.isValid(node)) {
                node.stopAction(this.sequence[i])
            }
        }
        anmiAct(epx)
    }
}
