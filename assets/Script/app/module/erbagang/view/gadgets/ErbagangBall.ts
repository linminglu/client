import GameBall from "../../../game/view/gadgets/GameBall"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator

@ccclass
export default class ErbagangBall extends GameBall {
    @property(cc.Node)
    layNumBall20: cc.Node = null;
    @property(cc.Node)
    laySprAllIdle: cc.Node = null;
    ballcom = [];
    ballpic = [];
    onLoad() {
        // this.animball.playOnLoad = false
        // this.animball.autoRemoveOnFinish = false
        // this.animdian.playOnLoad = false
        // this.animdian.autoRemoveOnFinish = false
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }

    receiveBallFun() {
        let self = this
        // this.animball.resetSystem()
        // this.animdian.resetSystem()

        // FuncUtil.delayFunc(function () {
        //     self.animball.stopSystem()
        //     self.animdian.stopSystem()
        // }, 2, self.node)

        this.layNumBall20.active = false;
        this.laySprAllIdle.active = false;
        FuncUtil.delayFunc(function () {
            self.layNumBall20.active = true;
            self.laySprAllIdle.active = true;
            if (!cc.isValid(self.node)) return;

            let cardsList = GameManager.instance.getCardTotals()
            if (self.ballcom.length > 0) {
                for (let i = 0; i < 20; i++) {
                    self.ballcom[i].getComponent("FramBrandBg").updateItemBallFun(cardsList[i])
                    if (i > 7) continue;
                    self.ballpic[i].getComponent('FramBrandBg').updateItemBallFun(cardsList[i]);
                }

            } else {
                ResCfg.loadPrefab(self, "framBrand", function (self, prefab) {

                    for (let i = 0; i < 20; i++) {
                        self.ballcom[i] = cc.instantiate(prefab);
                        self.layNumBall20.addChild(self.ballcom[i]);
                        self.ballcom[i].getComponent("FramBrandBg").updateItemBallFun(cardsList[i])
                    }
                    for (let j = 0; j < 8; j++) {
                        self.ballpic[j] = cc.instantiate(prefab);
                        if (j % 4 == 0) {
                            self.laySprAllIdle.getChildByName('sprAllIdle1').addChild(self.ballpic[j]);
                        } else if (j % 4 == 1) {
                            self.laySprAllIdle.getChildByName('sprAllIdle2').addChild(self.ballpic[j]);
                        } else if (j % 4 == 2) {
                            self.laySprAllIdle.getChildByName('sprAllIdle3').addChild(self.ballpic[j]);
                        } else if (j % 4 == 3) {
                            self.laySprAllIdle.getChildByName('sprAllIdle4').addChild(self.ballpic[j]);
                        }
                        self.ballpic[j].getComponent('FramBrandBg').updateItemBallFun(cardsList[j]);
                    }
                })
            }
        }, 3, self.node)
    }


}
