import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { GameCfg } from "../../../../../GameConfig"
import { GameModel } from "../../model/GameModel"
import { TimeUtil } from "../../../../common/util/TimeUtil"
import { FuncUtil } from "../../../../common/util/FuncUtil"

const { ccclass, property } = cc._decorator

@ccclass
export default class GameTime extends cc.Component {
    private isBackGround = false
    timeType = null
    txtType = null          //图片类型
    nodeTime = null

    onLoad() {
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        GameManager.instance.registerModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.initView, this)

        GameManager.instance.registerModelChanged("COMMON_END_BETTING_CHANGE", this.endBetting, this)

        this.initView()
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        GameManager.instance.unregisterModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.initView, this)

        GameManager.instance.unregisterModelChanged("COMMON_END_BETTING_CHANGE", this.endBetting, this)
    }

    gameEnterBackGround(eventName: string, isBackGround: boolean = true) {
        this.isBackGround = isBackGround
        let self = this

        if (!isBackGround) {
            FuncUtil.delayFunc(function () {
                self.initView()
            }, 0.1)
        }
    }

    private startBetFun(eventName: string, remainTime: number = 0, endTime: number) {
        this.updateView(endTime, 1, "txt_start_bet")
    }

    private endBetting(eventName: string, remainTime: number = 0, endTime: number) {
        this.updateView(endTime, 2, "txt_hair_card")
    }

    private startAwardFun(eventName: string, remainTime: number = 0, endTime: number) {
        this.updateView(endTime, 2, "txt_hair_card")
    }

    private initView() {
        let gameEndTime = GameManager.instance.getGameEndTime()
        let gameState = GameManager.instance.getGameState()
        let imgPath = "txt_start_bet"
        if (gameState == 1) {  //开奖阶段
            gameState = 2
            imgPath = "txt_hair_card"
        } else {
            gameState = 1
        }

        this.updateView(gameEndTime, gameState, imgPath)
    }

    timeEndCallFun() {
        if (this.timeType == 1) {
            GameManager.instance.changedModel("COMMON_START_BET_CHANGE", 0)
        } else if (this.timeType == 2) {
            GameManager.instance.changedModel("COMMON_START_AWARD_CHANGE", 0)
        }
    }

    updateView(endTime: number = 0, timeType: number, imgPath: string = null) {
        if (this.isBackGround) {
            return
        }

        let remainTime = TimeUtil.getRemainTime(endTime)

        let self = this
        this.timeType = timeType

        if (!cc.isValid(this.nodeTime)) {
            ResCfg.loadPrefab(this, "sprTime", function (self, prefab) {
                let gameTime = cc.instantiate(prefab)

                self.node.getChildByName("nodegameTime").addChild(gameTime)
                self.nodeTime = gameTime
                self.updateFun(endTime, imgPath)
            })
        } else {
            self.updateFun(endTime, imgPath)
        }
    }

    setTxtType(txtType = null) {
        this.txtType = txtType
    }

    updateFun(remainTime, imgPath) {
        let self = this
        this.nodeTime.getComponent('SprTime').updelayTimeNodeFun(remainTime, self.txtType, imgPath, function (time) {
            if (time <= 0) {
                self.timeEndCallFun()
            } else if (time <= GameCfg.GAME_BET_END_TIME) {
                if (self.timeType == 1) {
                    GameManager.instance.changedModel("COMMON_END_BET_CHANGE", time)
                    
                    if (time == GameCfg.GAME_BET_END_TIME) {
                        FuncUtil.delayFunc(function() {
                            GameModel.instance.cancelBetJetton()
                        }, 1.5)
                    }
                }
            }
        })
    }
}
