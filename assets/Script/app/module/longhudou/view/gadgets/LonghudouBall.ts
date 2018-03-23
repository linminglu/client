import GameBall from "../../../game/view/gadgets/GameBall"
import { GameManager } from "../../../../common/manager/GameManager"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator

@ccclass
export default class LonghudouBall extends GameBall {

    @property(cc.Node)
    layNumBall20: cc.Node = null;
    @property(cc.Node)
    layResults: cc.Node = null
    @property(cc.Prefab)
    numResultsItem: cc.Prefab = null
    numBallArr: cc.Node[] = [];
    layResultsArr: cc.Node[] = []
    layResultsNodeArr = [];
    onLoad() {
        // this.animball.playOnLoad = false
        // this.animball.autoRemoveOnFinish = false
        this.longhudouBallInitFun()
        super.onLoad()

    }

    onDestroy() {
        super.onDestroy()
    }

    upNodeBallLayShow(data) {       //结果显示
        if (data == null || data == undefined) return;
        if (!cc.isValid(this.node)) return;
        this.upBallResultsSprInitFun();
        let dataArr = data;
        let strArr: string = null
        for (let i = 0; i < 2; i++) {
            strArr = dataArr[i].toString()
            for (let j = 0; j < strArr.length; j++) {
                this.layResultsNodeArr[i][j].getComponent("NumResultsItem").upDataInitFun(strArr[j])
                this.layResultsNodeArr[i][j].active = true;
            }
        }
    }

    receiveBallFun() {
        let self = this
        // this.animball.resetSystem()

        // FuncUtil.delayFunc(function () {
        //     self.animball.stopSystem()
        // }, 2, self.node)

        this.layNumBall20.active = false;
        this.layResults.active = false

        FuncUtil.delayFunc(function () {
            self.layNumBall20.active = true;
            self.layResults.active = true;
            let cardsList = GameManager.instance.getCardTotals();
            if (!cc.isValid(self.node)) return;
            if (self.numBallArr.length > 0) {
                for (let i = 0; i < 20; i++) {
                    self.numBallArr[i].getComponent("FramBrandBg").updateItemBallFun(cardsList[i]);
                }
            } else {
                ResCfg.loadPrefab(self, "framBrand", function (self, prefab) {
                    for (let i = 0; i < 20; i++) {
                        self.numBallArr[i] = cc.instantiate(prefab);
                        self.numBallArr[i].getComponent("FramBrandBg").updateItemBallFun(cardsList[i]);
                        self.layNumBall20.addChild(self.numBallArr[i]);
                    }
                }, false, true);
            }

            let jieguoArr = self.upDataNumberSumFun(cardsList);
            self.upNodeBallLayShow(jieguoArr);
        }, 3, self.node)
    }

    upBallResultsSprInitFun() {
        for (let i = 0; i < 2; i++) {

            for (let j = 0; j < 3; j++) {

                this.layResultsNodeArr[i][j].active = false;

            }
        }
    }

    longhudouBallInitFun() {
        for (let i = 0; i < 2; i++) {
            this.layResultsArr[i] = this.layResults.getChildByName(`layResults${i + 1}`)
            this.layResultsNodeArr[i] = [];
            for (let j = 0; j < 3; j++) {
                this.layResultsNodeArr[i][j] = cc.instantiate(this.numResultsItem)
                this.layResultsArr[i].addChild(this.layResultsNodeArr[i][j]);
            }
        }
        ////////////cc.log(this.layResultsNodeArr)
    }
    upDataNumberSumFun(data) {
        let dataArr = data;
        let dataObj = [0, 0]

        for (let i = 0; i < dataArr.length; i++) {
            if (i < 10) {
                dataObj[0] += dataArr[i];
                continue;
            }
            dataObj[1] += dataArr[i];
        }
        return dataObj

    }
}
