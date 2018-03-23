import { ResConfig as ResCfg } from "../util/ResConfig"
import { FuncUtil } from "../util/FuncUtil"
import { NodePoolMgr, NodePoolKey } from "../manager/NodePoolMgr"

const { ccclass, property, executionOrder } = cc._decorator

@ccclass
// @executionOrder(-1)
export default class JettonGrop extends cc.Component {
    private jettonPrefab = []
    private jettonArr = null
    private lstJettonArr = null   //用于更新用

    onLoad() {

    }

    onDestroy() {
        this.node.stopAllActions()
    }

    initView(jettonArr) {
        if (this.jettonArr == null) {
            this.jettonArr = jettonArr
            this.lstJettonArr = jettonArr
        } else {
            this.lstJettonArr = this.jettonArr
            this.jettonArr = jettonArr
        }


        if (this.jettonArr.length >= this.lstJettonArr.length) {
            this.updateViewFun(this.lstJettonArr, this.jettonArr, this.jettonArr.length)
        } else {
            this.updateViewFun(this.lstJettonArr, this.jettonArr, this.lstJettonArr.length)
        }
    }

    private updateJettonItem(prefab, i, data) {
        //////cc.log("-----------i = ", i)
        let self = this
        let curView = cc.instantiate(prefab)
        self.jettonPrefab[i] = curView
        curView.getComponent('JettonItem').updateItemFun(data)
        self.node.addChild(curView)
    }

    private updateViewFun(jettonArr, curJettonArr, length) {
        //////cc.log("2----updateViewFun----------")
        ////////////cc.log(jettonArr)
        ////////////cc.log(curJettonArr)

        let self = this
        for (let i = 0; i < length; i++) {
            // self.scheduleOnce(function() {
            FuncUtil.delayFunc(function () {
                if (Boolean(curJettonArr[i])) {
                    //////cc.log("1--", i, curJettonArr[i])
                    if (cc.isValid(self.jettonPrefab[i])) {
                        //////cc.log("2--", i, curJettonArr[i])
                        self.jettonPrefab[i].getComponent('JettonItem').updateItemFun(curJettonArr[i])
                    } else {
                        //////cc.log("3--", i, curJettonArr[i])
                        // ResCfg.loadPrefab(self, "jettonItem", function (self, prefab, data) {
                        //     // //////cc.log("4--", i, data)                            
                        //     let curView = cc.instantiate(prefab)
                        //     self.jettonPrefab[i] = curView
                        //     curView.getComponent('JettonItem').updateItemFun(data)
                        //     self.node.addChild(curView)
                        // }, false, true, curJettonArr[i])

                        let prefab = NodePoolMgr.instance.getNood(NodePoolKey.JETTON_ITEM)
                        if (cc.isValid(prefab)) {
                            //////cc.log("5--")
                            self.updateJettonItem(prefab, i, curJettonArr[i])
                        } else {
                            //////cc.log("6--")
                            ResCfg.loadPrefab(self, "jettonItem", function (self, prefab) {
                                //////cc.log("7--")
                                self.updateJettonItem(prefab, i, curJettonArr[i])
                            }, false, true)
                        }
                    }
                } else {
                    // //////cc.log("5--", i, curJettonArr[i])                
                    if (cc.isValid(self.jettonPrefab[i])) {
                        NodePoolMgr.instance.putNood(self.jettonPrefab[i], NodePoolKey.JETTON_ITEM)
                        // self.jettonPrefab[i].destroy()
                        self.jettonPrefab[i] = null
                    }
                }
            }, 0.02 * i, this.node)
            // }, 0.02)
        }

    }
}
