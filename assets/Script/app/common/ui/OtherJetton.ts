import { ResConfig as ResCfg } from "../util/ResConfig"
import { GameManager } from "../manager/GameManager"
import { EmitterManager as Emitter } from "../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../app/config/EmitterConfig"
import { GameCfg } from "../../../GameConfig"
import { FuncUtil } from "../util/FuncUtil"

const { ccclass, property } = cc._decorator

@ccclass
export default class OtherJetton extends cc.Component {
    private isBackGround = false
    protected jetton = null
    private betAreaIdx = null                   //下注区索引
    protected gameJettonTime: number = GameCfg.GAME_JETTON_SHOW_TIME      //筹码显示时间

    onLoad() {
        this.betAreaIdx = this.node.parent.name.replace(/[^0-9]/ig, "")
        this.betAreaIdx = Number(this.betAreaIdx) + 1
        
        GameManager.instance.unregisterModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameManager.instance.registerModelChanged("COMMON_SYN_TOTAL_MONEY_CHANGE", this.synJetton, this)
        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        // GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        Emitter.register(EmitterCfg.GAME_END_COMPARE_PAI, this.endCompareFun, this)
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)

        this.initView()
    }

    onDestroy() {
        GameManager.instance.unregisterModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameManager.instance.unregisterModelChanged("COMMON_SYN_TOTAL_MONEY_CHANGE", this.synJetton, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        // GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        Emitter.unregister(EmitterCfg.GAME_END_COMPARE_PAI, this.endCompareFun, this)
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
    }

    enterGame() {
        this.initView()
    }

    initView() {
        let enterGameMsg = GameManager.instance.getEnterGame()
        let gameState = GameManager.instance.getGameState()

        if (gameState == 1) {  //开奖阶段
        } else {
            if ((enterGameMsg.openTotalTime - this.gameJettonTime) < enterGameMsg.remainTime) {
                let money = GameManager.instance.getOtherAreaTotalsList(this.betAreaIdx).money
                this.updateView(money)
            } else {
                // this.updateView()
            }
        }
    }

    updateView(jettonnNum: number = 0) {
        if (!cc.isValid(this.jetton)) {
            ResCfg.loadPrefab(this, "jettonView", function (self, prefab) {
                self.jetton = cc.instantiate(prefab)
                self.node.addChild(self.jetton)
                self.jetton.setAnchorPoint(0.5, 0)
                self.jetton.setPosition(cc.p(-100, -50))
                self.jetton.getComponent('JettonView').initView(jettonnNum, false)
            }, false, true)
        } else {
            this.jetton.getComponent('JettonView').initView(jettonnNum, false)
        }
    }

    synJetton(eventName: string, msg) {
        // let jettonList = msg.totalsList

        // for (let i = 0; i < jettonList.length; i++) {
        //     let jetton = jettonList[i]
        //     if (jetton.posId == this.betAreaIdx) {
        //         this.updateView(jetton.money)
        //         break
        //     }
        // }
        
        if (this.isBackGround) {
            return
        }
        
        let money = GameManager.instance.getOtherAreaTotalsList(this.betAreaIdx).money
        this.updateView(money)
    }

    startBetFun(eventName: string, remainTime: number = 0) {
        if (remainTime > 0) {
            this.updateView(0)
        }
    }

    startAwardFun(eventName: string, remainTime: number = 0) {
        this.updateView(0)
    }

    endCompareFun() {
        this.updateView(0)
    }

    gameEnterBackGround(eventName: string, isBackGround: boolean = true) {
        let self = this
        self.updateView(0)

        this.isBackGround = isBackGround
        
        if (!isBackGround) {
            FuncUtil.delayFunc(function () {
                let money = GameManager.instance.getOtherAreaTotalsList(self.betAreaIdx).money
                self.updateView(money)
            }, 0.6, self.node)
        } else {
            // self.updateView(0)
        }
    }
}
