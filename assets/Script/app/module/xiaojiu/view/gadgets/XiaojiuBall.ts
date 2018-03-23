import GameBall from "../../../game/view/gadgets/GameBall"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator

@ccclass
export default class XiaojiuBall extends GameBall {
    @property(cc.Node)
    layNumBall20: cc.Node = null;
    @property(cc.Node)
    laySprAllIdle: cc.Node = null;

    sprAllIdleArr = [];
    layDownResults = [];
    layNumBallArr = [];
    cardsList: any = null;
    xiaojiu_20numBallArr: cc.Node[] = [];
    layResultsArr = []

    onLoad() {
        // this.animball.playOnLoad = false
        // this.animball.autoRemoveOnFinish = false
        this.xiaojiuBallInitFun();
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
        this.laySprAllIdle.active = false;
        this.upBallResultsSprInitFun();
        FuncUtil.delayFunc(function () {
            self.layNumBall20.active = true;
            self.laySprAllIdle.active = true;
            self.cardsList = GameManager.instance.getCardTotals();
            if (self.xiaojiu_20numBallArr.length > 0) {
                for (let i = 0; i < 20; i++) {
                    self.xiaojiu_20numBallArr[i].getComponent("FramBrandBg").updateItemBallFun(self.cardsList[i]);
                }
            } else {
                ResCfg.loadPrefab(self, "framBrand", function (self, prefab) {
                    for (let i = 0; i < 20; i++) {
                        self.xiaojiu_20numBallArr[i] = cc.instantiate(prefab);
                        self.xiaojiu_20numBallArr[i].getComponent("FramBrandBg").updateItemBallFun(self.cardsList[i]);
                        self.layNumBall20.addChild(self.xiaojiu_20numBallArr[i]);
                    }
                }, false, true);
            }
            self.up4JiaNumberBallAndResultsFun();
        }, 3, self.node)
    }

    upDataWayFun(dataNum, nodeLay) {       //结果显示 方法
        let numStr = dataNum.toString()
        let nodeArr = nodeLay
        ResCfg.loadPlist(this, "txt_time", function (self, atlas) {
            for (let index in numStr) {
                nodeArr[index].spriteFrame = atlas.getSpriteFrame(`txt_time-${numStr[index]}`);
                nodeArr[index].node.active = true;
            }
        })

    }

    upBallResultsSprInitFun() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 3; j++) {
                this.layResultsArr[i][j].node.active = false;
            }
        }
    }

    up4JiaNumberBallAndResultsFun() {

        let sum = 0;
        for (let i = 0; i < 8; i++) {

            sum = this.up4JiaNumberBall(this.layNumBallArr[i], i);
            //this.upDataWayFun(sum, this.layDownResults[i]);
            this.upDataWayFun(sum, this.layResultsArr[i]);
        }

    }
    up4JiaNumberBall(nodeNum, num) {
        let nodeArr = nodeNum.children;
        let len = nodeArr.length
        let k = num;
        let sum = 0;
        for (let i = 0; i < nodeArr.length; i++) {
            if (len == 2) {
                sum += this.cardsList[k];
                nodeArr[i].getComponent("FramBrandBg").updateItemBallFun(this.cardsList[k]);
                k += 4;
            } else {
                k += 4;
                nodeArr[i].getComponent("FramBrandBg").updateItemBallFun(this.cardsList[k]);
                sum += this.cardsList[k];
            }

        }
        return sum
    }

    xiaojiuBallInitFun() {
        for (let i = 0; i < 8; i++) {
            this.sprAllIdleArr[i] = this.laySprAllIdle.getChildByName("sprAllIdle" + (i + 1));
            this.layNumBallArr[i] = this.sprAllIdleArr[i].getChildByName("layNumBall");
            this.layDownResults[i] = this.sprAllIdleArr[i].getChildByName("layDownResults");
            this.layResultsArr[i] = [];
            for (let j = 0; j < 3; j++) {
                let Node_1 = new cc.Node();
                this.layDownResults[i].addChild(Node_1)
                this.layResultsArr[i][j] = Node_1.addComponent(cc.Sprite).getComponent(cc.Sprite)
            }
        }
        ////////////cc.log(this.layResultsArr)
    }

}
