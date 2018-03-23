import { ResConfig as ResCfg } from "../util/ResConfig"
import { GameCollectManager as GameColMgr } from "../manager/GameCollectManager"
import { FuncUtil } from "../util/FuncUtil"
import { NodePoolMgr, NodePoolKey } from "../manager/NodePoolMgr"
const { ccclass, property, executionOrder } = cc._decorator

@ccclass
// @executionOrder(-1)
export default class JettonView extends cc.Component {
    @property(cc.Sprite)
    sprJetton: cc.Sprite = null

    @property(cc.Label)
    lblJetton: cc.Label = null

    // private _jettonArr = [5, 10, 50, 100, 2500, 5000]
    private _jettonArr = [100, 300, 500, 1000, 2500, 5000]
    private MAX_NUM = 10
    private WIDTH = 72
    private WIDTH_2 = 52
    private HEIGHT = 40
    private CEL_MAX = 1     //一行最多2堆
    private GAPWIDTH = 10   //间隔

    private jettonPrefab = []
    private jettonNum: number = 0
    private jettonArr = []
    private lstJettonArr = []   //用于更新用
    private jettonPos = []
    private sprJettonPos = cc.p(0, -10)
    private isOwn: boolean = false

    onLoad() {
        this._jettonArr = GameColMgr.instance.getJettonNumArr()
    }

    onDestroy() {

    }

    private parasData(data) {
        this._jettonArr.sort(function (a, b) { return b - a })
        // this._jettonArr.sort(function (a, b) { return a - b })

        // ////////////cc.log(this._jettonArr)

        let count = 0
        let idx = 0
        for (let i = 0; i < this._jettonArr.length; i++) {
            let key = this._jettonArr[i]
            let curNum = Math.floor(data / key)
            for (let i = 0; i < curNum; i++) {
                count++

                // if ((idx + 1) * 10 <= count) {
                //     idx += 1
                // }

                if (!this.jettonArr[idx]) {
                    this.jettonArr[idx] = []
                }

                this.jettonArr[idx].push(Number(key))

                data -= key
            }
        }

        this.jettonArr.sort(function (a, b) { return b - a })
        // ////////////cc.log(this.jettonArr)
    }

    private parasPos(jettonArr) {
        let maxL = jettonArr.length
        let posX = 0
        let posY = 0

        if (maxL == 2) {
            this.WIDTH = this.WIDTH_2
        }

        for (let i = 0; i < maxL; i++) {
            let cel = Math.floor(i / this.CEL_MAX)       //行
            let idx = i - this.CEL_MAX * cel             //列
            // ////////////cc.log(cel, idx)

            posY = (cel + 1) * this.HEIGHT
            if (i == maxL - 1 && (i % this.CEL_MAX) == 0) {
                posX = this.WIDTH * (idx + 1.5) + this.GAPWIDTH * (cel - 1)
            } else {
                posX = this.WIDTH * (idx + 1) + this.GAPWIDTH * cel
            }

            this.jettonPos.push(cc.p(posX, posY))
        }

        if (maxL > 2) {
            this.sprJettonPos.x = this.jettonPos[2].x
        } else if (maxL == 2) {
            this.sprJettonPos.x = this.jettonPos[1].x - this.WIDTH / 2
        } else if (maxL == 1) {
            this.sprJettonPos.x = this.jettonPos[0].x
        }
        // //////cc.log("this.sprJettonPos.x: ", this.sprJettonPos.x)
    }

    public initView(jettonNum: number, isOwn: boolean = true) {
        this.sprJetton.node.active = jettonNum > 0

        let isAdd = jettonNum > this.jettonNum

        this.jettonNum = jettonNum
        if (this.jettonArr == null) {
            this.jettonArr = []
        } else {
            this.lstJettonArr = this.jettonArr
            this.jettonArr = []
        }

        this.jettonPos = []

        this.isOwn = isOwn

        this.parasData(jettonNum)
        this.parasPos(this.jettonArr)


        let jettonArr
        let curJettonArr
        // //////cc.log("--isAdd: ", isAdd)
        if (isAdd) {
            jettonArr = this.jettonArr
            curJettonArr = this.jettonArr
        } else {
            jettonArr = this.lstJettonArr
            curJettonArr = this.jettonArr
        }
        this.updateViewFun(jettonArr, curJettonArr)
    }

    private updateJettonItem(prefab, i, curJettonArr) {
        let self = this
        let curView = cc.instantiate(prefab)
        self.node.addChild(curView, 100 - i)

        curView.setPosition(self.jettonPos[i] || cc.p(0, 0))
        curView.getComponent('JettonGrop').initView(curJettonArr[i])
        self.jettonPrefab[i] = curView
    }

    private updateViewFun(jettonArr, curJettonArr) {
        //////cc.log("===========================================", this.jettonNum)
        // //////cc.log("1----updateViewFun----------")
        // ////////////cc.log(jettonArr)
        // ////////////cc.log(curJettonArr)

        let self = this
        for (let i = 0; i < jettonArr.length; i++) {
            FuncUtil.delayFunc(function () {
                if (Boolean(curJettonArr[i])) {
                    if (cc.isValid(self.jettonPrefab[i])) {
                        self.jettonPrefab[i].setPosition(self.jettonPos[i] || cc.p(0, 0))
                        self.jettonPrefab[i].getComponent('JettonGrop').initView(curJettonArr[i])
                    } else {
                        // ResCfg.loadPrefab(self, "jettonGrop", function (self, prefab) {
                        //     let curView = cc.instantiate(prefab)
                        //     self.node.addChild(curView, 100 - i)

                        //     curView.setPosition(self.jettonPos[i] || cc.p(0, 0))
                        //     curView.getComponent('JettonGrop').initView(curJettonArr[i])
                        //     self.jettonPrefab[i] = curView
                        // }, false, true)

                        let prefab = NodePoolMgr.instance.getNood(NodePoolKey.JETTON_GROP)
                        if (cc.isValid(prefab)) {
                            //cc.log("------------------1")
                            self.updateJettonItem(prefab, i, curJettonArr)
                        } else {
                            ResCfg.loadPrefab(self, "jettonGrop", function (self, prefab) {
                                //cc.log("------------------2")
                                self.updateJettonItem(prefab, i, curJettonArr)
                            }, false, true)
                        }
                    }
                } else {
                    if (cc.isValid(self.jettonPrefab[i])) {
                        //cc.log("------------------3")
                        for (let prefab of self.jettonPrefab[i].children) {
                            //cc.log("------------------4")
                            NodePoolMgr.instance.putNood(prefab, NodePoolKey.JETTON_ITEM)
                        }

                        FuncUtil.delayFunc(function () {
                            if (cc.isValid(self.jettonPrefab[i])) {
                                for (let prefab of self.jettonPrefab[i].children) {
                                    //cc.log("------------------5")
                                    prefab.destroy()
                                }
    
                                if (cc.isValid(self.jettonPrefab[i])) {
                                    //cc.log("------------------6")
                                    NodePoolMgr.instance.putNood(self.jettonPrefab[i], NodePoolKey.JETTON_GROP)
                                    // self.jettonPrefab[i].destroy()
                                }
                                self.jettonPrefab[i] = null
                            }
                        }, 0.01, self.node)
                    }
                }

            }, 0.01 * i, self.node)
        }

        this.lblJetton.string = this.jettonNum.toString()
        this.lblJetton.node.color = this.isOwn ? cc.color(255, 240, 0) : cc.color(255, 77, 0)
        this.sprJetton.node.setPosition(this.sprJettonPos || cc.p(0, 0))
    }


}

/****

        let curView
        let jettonnNum = 28005
        // let jettonnNum = 18005
        // let jettonnNum = 8005
        ResCfg.loadPrefab(this, "jettonView", function(self, prefab) {
            curView = cc.instantiate(prefab)
            node.addChild(curView)
            curView.setAnchorPoint(0, 0)
            curView.setPosition(cc.p(52, 100))
            curView.getComponent('JettonView').initView(jettonnNum, false)
        }, false, true)

        FuncUtil.delayFunc(function() {
            // ////////////cc.log(curView.getContentSize())
            let jettonnNum = 8005
            // curView.getComponent('JettonView').initView(jettonnNum, true)
        }, 5)

 */
