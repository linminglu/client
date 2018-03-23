import BaseView from "../../../common/baseui/BaseView"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { GameModel } from "../model/GameModel"
import { GameController } from "../controller/GameController"
import { GameModule } from "../GameModule"

import { AudioManager } from "../../../common/manager/AudioManager"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"
import { GameManager } from "../../../common/manager/GameManager"
import { LayerManager as LayerMgr } from "../../../common/manager/LayerManager"

import { GameCfg } from "../../../../GameConfig"
import { ResConfig as ResCfg } from "../../../common/util/ResConfig"
import { TimeUtil } from "../../../common/util/TimeUtil"
import { FuncUtil } from "../../../common/util/FuncUtil"
import { MainModel } from "../../main/model/MainModel";

const { ccclass, property } = cc._decorator

@ccclass
export default class GameView extends BaseView {
    viewLoading: string = "loadingView"
    protected gameTag: string = null
    protected gameBallTime: number = GameCfg.GAME_BALL_SHOW_TIME          //号码球倒计时3秒

    onLoad() {
        super.onLoad()
        this.gameTag = GameColMgr.instance.getGameTag()
        AudioManager.instance.playMusic(`bgm_${this.gameTag}`)

        GameManager.instance.registerModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        GameManager.instance.registerModelChanged("COMMON_END_BET_CHANGE", this.startBetFun, this)

        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        Emitter.register(EmitterCfg.GAME_START_COMPARE_PAI, this.startComparePaiFun, this)
        Emitter.register(EmitterCfg.GAME_END_COMPARE_PAI, this.startCompareEndFun, this)
        // Emitter.register(EmitterCfg.GAME_END_COMPARE_PAI, this.startSettlementFun, this)
        Emitter.register(EmitterCfg.GAME_EXIT_SUCC, this.quiteGameSucc, this)
        Emitter.register(EmitterCfg.GAME_EXIT_GAME, this.quiteGameSucc, this)

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            Emitter.fire(EmitterCfg.COM_PLAYER_BOX);
            event.stopPropagation();
        })

        this.enterGame()
    }

    onDestroy() {
        super.onDestroy()

        GameManager.instance.unregisterModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        GameManager.instance.unregisterModelChanged("COMMON_END_BET_CHANGE", this.startBetFun, this)

        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        Emitter.unregister(EmitterCfg.GAME_START_COMPARE_PAI, this.startComparePaiFun, this)
        Emitter.unregister(EmitterCfg.GAME_END_COMPARE_PAI, this.startCompareEndFun, this)
        // Emitter.unregister(EmitterCfg.GAME_END_COMPARE_PAI, this.startSettlementFun, this)
        Emitter.unregister(EmitterCfg.GAME_EXIT_SUCC, this.quiteGameSucc, this)
        Emitter.unregister(EmitterCfg.GAME_EXIT_GAME, this.quiteGameSucc, this)
    }

    gameEnterBackGround(eventName: string, isBackGround: boolean = true) {
        if (!isBackGround) {
            let view = LayerMgr.getNodeByName(this.viewLoading)
            if (!cc.isValid(view)) {
                LayerMgr.pushView(this.viewLoading, null, null, null, 999);
            } else {
                view.active = true;
            }

            this.node.active = true
            this.initView()
        } else {
            this.node.stopAllActions()
            this.node.active = false
        }
    }

    protected initView() {
        let gameState = GameManager.instance.getGameState()
        let gameEndTime = GameManager.instance.getGameEndTime()

        if (gameState == 1) {  //开奖阶段
            // this.node.getChildByName("nodeTableBoard").getChildByName("gameCards").getComponent("GameCards").showPai()
        } else {
            this.node.getChildByName("nodeTableBoard").getChildByName("gameCards").getComponent("GameCards").clearPai()
            this.startBetFun("", TimeUtil.getRemainTime(gameEndTime))
        }
    }

    protected quiteGameSucc() {
        MainModel.instance.updateGameData(GameColMgr.instance.getGameTyp())

        GameColMgr.instance.initGameData()
        GameModel.instance.clearData()

        AudioManager.instance.playMusic("bgm_main")
    }

    protected enterGame() {
        let self = this
        let enterGameMsg = GameManager.instance.getEnterGame()
        let gameState = GameManager.instance.getGameState()

        if (gameState == 1) {  //开奖阶段
            if ((enterGameMsg.openTotalTime - this.gameBallTime) < enterGameMsg.remainTime) {   //需要显示号码球
                let gameBall = this.node.getChildByName("gameBall")
                gameBall.active = true
                
                let remainTime = this.gameBallTime + enterGameMsg.remainTime - enterGameMsg.openTotalTime
                Emitter.fire(EmitterCfg.GAME_BALL_SHOW, remainTime, enterGameMsg.resultMsg.cardTotals)

                FuncUtil.delayFunc(function () {
                    Emitter.fire(EmitterCfg.GAME_START_FA_PAI, null)
                }, remainTime, this.node)
            } else {
                FuncUtil.delayFunc(function () {
                    self.node.getChildByName("nodeTableBoard").getChildByName("gameCards").getComponent("GameCards").showPai()
                }, 0.6, this.node)
            }
        } else {
            this.startBetFun("", enterGameMsg.remainTime)
        }
    }

    protected startAwardFun(eventName: string, remainTime: number = 0, endTime: number) {
        if (remainTime > 0) {
            let enterGameMsg = GameManager.instance.getEnterGame()
            let gameBall = this.node.getChildByName("gameBall")
            gameBall.active = true

            let time = GameCfg.GAME_BALL_SHOW_TIME

            Emitter.fire(EmitterCfg.GAME_BALL_SHOW, time, enterGameMsg.resultMsg.cardTotals)

            FuncUtil.delayFunc(function () {
                Emitter.fire(EmitterCfg.GAME_START_FA_PAI, null)
            }, time, this.node)
        }
    }

    startBetFun(eventName: string, remainTime: number = 0) {
        this.node.getChildByName("nodeTableBoard").getChildByName("gameLight").active = remainTime > GameCfg.GAME_BET_END_TIME
    }

    protected startComparePaiFun() {
        this.node.getChildByName("gameCompare").getComponent("GameCompare").showView()
    }

    protected startCompareEndFun(eventName: string, isBackGround: boolean = false) {
        this.node.getChildByName("gameLog").getComponent("HistoryUI").receiveHistoryFun()
        if (isBackGround) return;
        this.node.getChildByName("gameSettlement").getComponent("GameSettlement").ReceiveSettlementFun()
    }

}