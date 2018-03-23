import { GameManager } from "../../../../common/manager/GameManager"
import GameBall from "../../../game/view/gadgets/GameBall"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator;
@ccclass
export default class ZhajinhuaBall extends GameBall {
    @property(cc.Node)
    layNumBall20: cc.Node = null;
    @property(cc.Node)
    laySprAllIdle: cc.Node = null;
    @property(cc.Prefab)
    numResultsItem: cc.Prefab = null;

    layNumBall20Arr = [];
    layResultsArr = [];
    sprAllIdleArr: cc.Node[] = []

    onLoad() {
        // this.animball.playOnLoad = false
        // this.animball.autoRemoveOnFinish = false
        this.zhajinhuaBallInitFun();
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
        this.upBallResultsSprInitFun();
        FuncUtil.delayFunc(function () {
            let cardsList = GameManager.instance.getCardTotals();
            self.layNumBall20.active = true;
            self.laySprAllIdle.active = true;
            if (self.layNumBall20Arr.length > 0) {
                for (let i = 0; i < 20; i++) {
                    self.layNumBall20Arr[i].getComponent("FramBrandBg").updateItemBallFun(cardsList[i]);
                    if (i < 4) {
                        let nodeBall = self.laySprAllIdle.getChildByName("sprAllIdle" + i);
                        self.assignmentBallFun(nodeBall, i);
                    }
                }

            } else {
                ResCfg.loadPrefab(self, "framBrand", function (self, prefab) {
                    for (let i = 0; i < 20; i++) {
                        self.layNumBall20Arr[i] = cc.instantiate(prefab);
                        self.layNumBall20Arr[i].getComponent("FramBrandBg").updateItemBallFun(cardsList[i]);
                        self.layNumBall20.addChild(self.layNumBall20Arr[i]);
                    }
                    for (let j = 0; j < 4; j++) {
                        let nodeBall = self.laySprAllIdle.getChildByName("sprAllIdle" + j);
                        self.assignmentBallFun(nodeBall, j);
                    }
                }, false, true);
            }
        }, 3, self.node)
    }


    zhajinhuaBallInitFun() {
        let ZResults = {
            layResults1: [],
            layResults2: []
        }
        let nodeBall = null
        let layDownResults = null;
        for (let i = 0; i < 4; i++) {
            nodeBall = this.laySprAllIdle.getChildByName("sprAllIdle" + i);
            this.layResultsArr[i] = []//ZResults;
            for (let j = 0; j < 2; j++) {
                this.layResultsArr[i][j] = []
                layDownResults = nodeBall.getChildByName("layDownResults" + (j + 1));
                for (let k = 0; k < 3; k++) {
                    this.layResultsArr[i][j][k] = cc.instantiate(this.numResultsItem);
                    layDownResults.addChild(this.layResultsArr[i][j][k]);
                }
            }

        }
        // ////cc.log("炸金花==",this.layResultsArr);
    }
    upBallResultsSprInitFun() {

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 3; k++) {
                    this.layResultsArr[i][j][k].active = false
                }
            }
        }

    }

    assignmentBallFun(nodeBall, nub) {
        let cardsList = GameManager.instance.getCardTotals();
        let nodeBrand = nodeBall.getChildByName("framBrand" + nub);
        let resultArr = []
        let p = nub
        nodeBrand.getComponent("FramBrandBg").updateItemBallFun(cardsList[nub]);

        for (let k = 1; k <= 2; k++) {
            let layNumBall = nodeBall.getChildByName("layNumBall" + k);
            let layDownResults = nodeBall.getChildByName("layDownResults" + k);
            let result: number = 0;
            nub += 4;
            result = cardsList[nub]
            layNumBall.getChildByName("Addend").getComponent("FramBrandBg").updateItemBallFun(cardsList[nub]);
            nub += 4;
            result += cardsList[nub]
            layNumBall.getChildByName("Augend").getComponent("FramBrandBg").updateItemBallFun(cardsList[nub]);
            resultArr[k - 1] = result;
            // ResCfg.loadPrefab(this, "numResultsItem", function (self, prefab) {
            //     let Result=result+"";
            //     let arrResult=Result.split("");
            //     for (let index in arrResult) {
            //         let prefabs = cc.instantiate(prefab);
            //         layDownResults.addChild(prefabs);
            //         prefabs.getComponent("NumResultsItem").upDataInitFun(arrResult[index]);
            //     }
            // })
            ////////////cc.log(this.layResultsArr)
            this.sumresultArrFun(result, this.layResultsArr[p][k - 1]);
        }


    }
    sumresultArrFun(data, node1) {
        let dataS = data
        let strArr = dataS.toString()
        for (let i = 0; i < strArr.length; i++) {
            node1[i].getComponent("NumResultsItem").upDataInitFun(strArr[i]);
            node1[i].active = true;
        }
    }


}
