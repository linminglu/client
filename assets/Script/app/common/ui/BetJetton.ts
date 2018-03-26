import { ResConfig as ResCfg } from "../util/ResConfig"
import { FuncUtil } from "../util/FuncUtil"
import { EmitterManager as Emitter } from "../manager/EmitterManager"
import { EmitterCfg } from "../../config/EmitterConfig"
import { MainController } from "../../module/main/controller/MainController"
import { GameCollectManager as GameColMgr } from "../manager/GameCollectManager"
import { LonghudouModel } from "../../module/longhudou/model/LonghudouModel"
import { TonghuashunModel } from "../../module/Tonghuashun/model/TonghuashunModel"
import { TweenMsgView } from "../ui/TweenMsgView"
import { GameManager } from "../../../app/common/manager/GameManager"
import { NodePoolMgr, NodePoolKey } from "../manager/NodePoolMgr"
import { AudioManager } from "../manager/AudioManager"
import { GameModel } from "../../module/game/model/GameModel"


const { ccclass, property } = cc._decorator

@ccclass
export default class BetJetton extends cc.Component {
    private jettonSize = cc.size(52, 44)

    private betAreaIdx = null                   //下注区索引

    private jettonList = []                     //下注的筹码列表
    private betJettonNum = 0                    //下注筹码数量

    private repJettonList = []                  //下注的筹码列表
    private repBetJettonNum = 0                 //下注筹码数量

    private sprJetton = null
    private lblJettonNum = null                 //筹码数量

    onLoad() {
        this.betAreaIdx = this.node.parent.name.replace(/[^0-9]/ig, "")

        GameManager.instance.registerModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameModel.instance.registerModelChanged("GAME_TOUCH_BET_JETTON_CHANGE" + this.betAreaIdx, this.touchBetJetton, this)
        GameModel.instance.registerModelChanged("GAME_CANCEL_BET_JETTON_CHANGE" + this.betAreaIdx, this.cancelBetJetton, this)
        GameModel.instance.registerModelChanged("GAME_REPEAT_BET_JETTON_CHANGE" + this.betAreaIdx, this.repeatBetJetton, this)
        GameModel.instance.registerModelChanged("GAME_CONFIRM_BET_JETTON_CHANGE" + this.betAreaIdx, this.confirmBetJetton, this)
        GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)

        GameModel.instance.registerModelChanged("COMMON_CLEAR_BET_JETTON_CHANGE", this.clearBet, this)
        Emitter.register(EmitterCfg.GAME_END_COMPARE_PAI, this.clearBetJetton, this)

        this.initView()
    }

    onDestroy() {
        GameManager.instance.unregisterModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameModel.instance.unregisterModelChanged("GAME_TOUCH_BET_JETTON_CHANGE" + this.betAreaIdx, this.touchBetJetton, this)
        GameModel.instance.unregisterModelChanged("GAME_CANCEL_BET_JETTON_CHANGE" + this.betAreaIdx, this.cancelBetJetton, this)
        GameModel.instance.unregisterModelChanged("GAME_REPEAT_BET_JETTON_CHANGE" + this.betAreaIdx, this.repeatBetJetton, this)
        GameModel.instance.unregisterModelChanged("GAME_CONFIRM_BET_JETTON_CHANGE" + this.betAreaIdx, this.confirmBetJetton, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)

        GameModel.instance.unregisterModelChanged("COMMON_CLEAR_BET_JETTON_CHANGE", this.clearBet, this)
        Emitter.unregister(EmitterCfg.GAME_END_COMPARE_PAI, this.clearBetJetton, this)
        
        this.node.stopAllActions()
    }

    enterGame() {
        let gameState = GameManager.instance.getGameState()
        if (gameState == 1) {  //开奖阶段
            this.clearBetJetton()
        }
    }

    initView() {
        if (!cc.isValid(this.sprJetton)) {
            ResCfg.loadPrefab(this, "sprJetton", function (self, prefab) {
                self.sprJetton = cc.instantiate(prefab)
                self.node.addChild(self.sprJetton, 9999)

                self.lblJettonNum = self.sprJetton.getChildByName("lblJetton").getComponent(cc.Label)

                self.updateJettonNum(self.betJettonNum)
            }, false, true)
        }
    }

    clearBet() {
        let i = 0
        if (cc.isValid(this.node)) {
            for (let prefab of this.node.children) {
                FuncUtil.delayFunc(function () {
                    prefab.destroy()
                }, 0.1 * i, this.node)
                i++
            }
        }
    }

    clearBetJetton() {
        let self = this
        if (this.jettonList) {
            for (let i = 0; i < this.jettonList.length; i++) {
                FuncUtil.delayFunc(function () {
                    if (self.jettonList == null) return
                    let jettonItem = self.jettonList.shift()
                    if (cc.isValid(jettonItem)) {
                        NodePoolMgr.instance.putNood(jettonItem, NodePoolKey.BET_JETTON)
                        // jettonItem.destroy()
                    }
                }, 0.01 * i, this.node)
            }

            this.updateJettonNum(0)
        }
    }

    startAwardFun(eventName: string, remainTime: number = 0) {
        if (remainTime <= 0) {
            return
        }

        this.clearBetJetton()

        let self = this
        FuncUtil.delayFunc(function () {
            self.clearBet()
        }, 1.5, self.node)
    }

    //确定下注成功
    public confirmBetJetton(eventName: string, betAreaJetton, isRepeat: boolean = false) {     
        let self = this

        let jettonList = []
        if (isRepeat) {
            this.repBetJettonNum = 0
            jettonList = this.repJettonList
        } else {
            this.betJettonNum = 0
            jettonList = this.jettonList
        }

        for (let i = 0; i < jettonList.length; i++) {
            FuncUtil.delayFunc(function () {
                let jettonItem = jettonList.shift()
                if (cc.isValid(jettonItem)) {
                    let action = cc.sequence(cc.fadeIn(0.01), cc.callFunc(function () {
                        NodePoolMgr.instance.putNood(jettonItem, NodePoolKey.BET_JETTON)
                        // jettonItem.destroy()
                    }))
                    jettonItem.runAction(action)
                }
            }, 0.1 * i, self.node)
        }

        this.updateJettonNum(this.betJettonNum)
    }

    //点击下注
    public touchBetJetton(eventName: string, betAreaIdx) {   
        this.initView()

        let dataObj = this.resolverData()
        let beginPos = dataObj.beginPos
        let endPos = dataObj.endPos
        let jettonNum = dataObj.jettonNum

        let prefab = NodePoolMgr.instance.getNood(NodePoolKey.BET_JETTON)
        if (cc.isValid(prefab)) {
            this.updateJettonItem(prefab, jettonNum, beginPos, endPos, this.jettonList)
        } else {
            ResCfg.loadPrefab(this, "jettonItem", function (self, prefab) {
                self.updateJettonItem(prefab, jettonNum, beginPos, endPos, self.jettonList)
            }, false, true)
        }

        // ResCfg.loadPrefab(this, "jettonItem", function (self, prefab) {
        //     let curView = cc.instantiate(prefab)
        //     self.node.addChild(curView)
        //     curView.setPosition(beginPos)
        //     curView.tag = jettonNum
        //     curView.getComponent('JettonItem').updateItemFun(jettonNum, function () {
        //         let action1 = cc.moveTo(0.3, cc.p(endPos))
        //         // curView.runAction(action1.easing(cc.easeOut(4)))
        //         curView.runAction(action1)
        //         self.jettonList.push(curView)
        //     })
        // }, false, true)

        this.betJettonNum += jettonNum
        this.updateJettonNum(this.betJettonNum)
    }

    private updateJettonItem(prefab, jettonNum, beginPos, endPos, jettonList) {
        let self = this

        let curView = cc.instantiate(prefab)
        self.node.addChild(curView)
        curView.setPosition(beginPos)
        curView.tag = jettonNum
        curView.getComponent('JettonItem').updateItemFun(jettonNum, function () {
            let action1 = cc.moveTo(0.3, cc.p(endPos))
            // curView.runAction(action1.easing(cc.easeOut(4)))
            curView.runAction(action1)
            jettonList.push(curView)
        })
    }

    //重复下注,暂时修改
    public repeatBetJetton(eventName: string, betAreaJetton) {  
        let self = this
        let i = 0 
        self.schedule(function() {  
            let jettonNum = betAreaJetton[i]
            let dataObj = self.resolverData()
            let beginPos = dataObj.beginPos
            let endPos = dataObj.endPos

            let prefab = NodePoolMgr.instance.getNood(NodePoolKey.BET_JETTON)
            if (cc.isValid(prefab)) {
                self.updateJettonItem(prefab, jettonNum, beginPos, endPos, self.repJettonList)
            } else {
                ResCfg.loadPrefab(self, "jettonItem", function (self, prefab) {
                    self.updateJettonItem(prefab, jettonNum, beginPos, endPos, self.repJettonList)
                }, false, true)
            }

            self.repBetJettonNum += jettonNum
            if (i == betAreaJetton.length - 1) {
                self.updateJettonNum(self.repBetJettonNum + self.betJettonNum)
            }
            i++
        }, 0.3*i+0.2, betAreaJetton.length-1);  
    }

        // //重复下注，下面是原来的代码
        // public repeatBetJetton(eventName: string, betAreaJetton) {  
        //     let self = this
        //     for (let i = 0; i < betAreaJetton.length; i++) {
        //         FuncUtil.delayFunc(function () {
        //             let jettonNum = betAreaJetton[i]
        //             let dataObj = self.resolverData()
        //             let beginPos = dataObj.beginPos
        //             let endPos = dataObj.endPos
    
        //             let prefab = NodePoolMgr.instance.getNood(NodePoolKey.BET_JETTON)
        //             if (cc.isValid(prefab)) {
        //                 self.updateJettonItem(prefab, jettonNum, beginPos, endPos, self.repJettonList)
        //             } else {
        //                 ResCfg.loadPrefab(self, "jettonItem", function (self, prefab) {
        //                     self.updateJettonItem(prefab, jettonNum, beginPos, endPos, self.repJettonList)
        //                 }, false, true)
        //             }
    
        //             self.repBetJettonNum += jettonNum
        //             if (i == betAreaJetton.length - 1) {
        //                 self.updateJettonNum(self.repBetJettonNum + self.betJettonNum)
        //             }
    
        //             // ResCfg.loadPrefab(self, "jettonItem", function (self, prefab) {
        //             //     let curView = cc.instantiate(prefab)
        //             //     self.node.addChild(curView)
        //             //     curView.setPosition(beginPos)
        //             //     curView.tag = jettonNum
        //             //     curView.getComponent('JettonItem').updateItemFun(jettonNum, function () {
        //             //         let action1 = cc.moveTo(0.3, cc.p(endPos))
        //             //         // curView.runAction(action1.easing(cc.easeOut(4)))
        //             //         curView.runAction(action1)
        //             //         self.repJettonList.push(curView)
        //             //     })
        //             // }, false, true)
        //         }, 0.1 * i, self.node);
        //     }
        // }

    //取消下注
    public cancelBetJetton(eventName: string, betAreaJetton) {  
        let self = this

        for (let i = 0; i < this.jettonList.length; i++) {
            FuncUtil.delayFunc(function () {
                let jettonItem = self.jettonList.shift()
                if (cc.isValid(jettonItem)) {
                    let dataObj = self.resolverData(jettonItem.tag, false, jettonItem)
                    let beginPos = dataObj.beginPos
                    let endPos = dataObj.endPos

                    let action = cc.sequence(cc.moveTo(0.3, cc.p(endPos)), cc.callFunc(function () {
                        NodePoolMgr.instance.putNood(jettonItem, NodePoolKey.BET_JETTON)
                        // jettonItem.destroy()
                    }))
                    jettonItem.runAction(action)
                }
            }, 0.01 * i, self.node);
        }

        this.betJettonNum = 0
        this.updateJettonNum(this.betJettonNum)
    }

    private updateJettonNum(jettonNum) {
        if (cc.isValid(this.lblJettonNum)) {
            this.lblJettonNum.string = jettonNum
        }
        
        if (cc.isValid(this.sprJetton)) {
            this.sprJetton.active = jettonNum > 0
        }
        
    }

    private resolverData(jettonNum: number = null, isBet: boolean = true, nodeJetton = null) {
        let jettonObj = GameModel.instance.getJettonWorldPos(jettonNum)
        let curJettonWorldPos = jettonObj.worldPos
        jettonNum = jettonObj.jettonNum

        let beginPos = this.node.convertToNodeSpaceAR(curJettonWorldPos)
        let endPos = this.unEllipsePositionRandFun()

        if (isBet) {
            beginPos = this.node.convertToNodeSpaceAR(curJettonWorldPos)
            endPos = this.unEllipsePositionRandFun()
        } else {
            beginPos = nodeJetton.getPosition()
            endPos = this.node.convertToNodeSpaceAR(curJettonWorldPos)
        }

        return {
            beginPos: beginPos,
            endPos: endPos,
            jettonNum: jettonNum,
        }
    }

    private unEllipsePositionRandFun() {
        let node = this.node
        let objWidth: number = node.width / 2 - (this.jettonSize.width / 2)
        let objHeight: number = node.height / 2 - (this.jettonSize.height / 2)
        let position = {
            x: 0,
            y: 0
        }
        position.y = this.upDataNumFun(objHeight)
        position.x = this.upDataNumXFun(position.y, objWidth, objHeight)

        return position
    }

    private upDataNumXFun(y, objWidth, objHeight) {
        let x = 0
        let numXY = 0
        x = this.upDataNumFun(objWidth)
        numXY = (x * x) / (objWidth * objWidth) + (y * y) / (objHeight * objHeight)

        if (numXY < 1) {
            return x
        } else {
            return x = 0
        }
    }

    private upDataNumFun(objWH) {
        let num = Math.floor(Math.random() * 2 + 1)
        let p = 0
        if (num == 1) {
            p = FuncUtil.upRandomzuobiaoFun(0, objWH)

        } else {
            p = 0 - FuncUtil.upRandomzuobiaoFun(0, objWH)
        }

        return p
    }
}
