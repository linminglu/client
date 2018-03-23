import GameBall from "../../../game/view/gadgets/GameBall"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator

@ccclass
export default class NiuniuBall extends GameBall {
    @property(cc.Node)
    layNumBall20: cc.Node = null;
    @property(cc.Node)
    laySprAllIdle: cc.Node = null;
    ballpic = [];
    ballcom = [];
    onLoad() {
        // this.animball.playOnLoad = false
        // this.animball.autoRemoveOnFinish = false
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }
    receiveBallFun() {
        let self = this
        // this.animball.resetSystem()

        // FuncUtil.delayFunc(function () {
        //     self.animball.stopSystem()
        // }, 2, self.node)
        this.layNumBall20.active = false;
        this.laySprAllIdle.active = false
        FuncUtil.delayFunc(function () {
            self.layNumBall20.active = true;
            self.laySprAllIdle.active = true;
            if (!cc.isValid(self.node)) return;
            let cardsList = GameManager.instance.getCardTotals()
            let j = 0;
            if (self.ballcom.length > 0) {
                for (let i = 0; i < 20; i++) {
                    self.ballpic[i].getComponent('FramBrandBg').updateItemBallFun(cardsList[i]);
                    self.ballcom[i].getComponent("FramBrandBg").updateItemBallFun(cardsList[i])
                }
            } else {
                ResCfg.loadPrefab(self, "framBrand", function (self, prefab) {
                    for (let i = 0; i < 5; i++) {
                        for (let k = 0; k < 4; k++) {
                            self.ballpic[j] = cc.instantiate(prefab);
                            self.laySprAllIdle.getChildByName(`sprAllIdle${k + 1}`).addChild(self.ballpic[j]);
                            self.ballpic[j].getComponent('FramBrandBg').updateItemBallFun(cardsList[j]);
                            self.ballcom[j] = cc.instantiate(prefab);
                            self.layNumBall20.addChild(self.ballcom[j]);
                            self.ballcom[j].getComponent("FramBrandBg").updateItemBallFun(cardsList[j])
                            j++;
                        }
                    }
                })
            }
        }, 3, self.node)
    }
}
