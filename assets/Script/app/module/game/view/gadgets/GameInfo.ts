import { GameModel } from "../../model/GameModel"
import { GameManager, PlayerMsg } from "../../../../common/manager/GameManager"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { IconArr } from "../../../../../GameConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
import {EmitterManager as Emitter} from "../../../../common/manager/EmitterManager"
import {EmitterCfg} from "../../../../../app/config/EmitterConfig"

const { ccclass, property } = cc._decorator

@ccclass
export default class GameInfo extends cc.Component {
    private isBackGround = false
    gameArr = null
    rlblGameInfo = null

    onLoad() {
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)

        this.initView()
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
    }
    
    initView() {
        this.gameArr = GameColMgr.instance.getGameArr()

        let rlblGameInfo = this.node.getChildByName("rlblGameInfo").getComponent(cc.RichText)
        this.rlblGameInfo = rlblGameInfo

        this.updateView()
    }

    updateView() {
        if (this.isBackGround) {
            return
        }

        let awardNo = GameManager.instance.getAwardNo()
        let infoStr = `第${awardNo || new Date().getTime()}期 ${this.gameArr.name} 下注额区间：${this.gameArr.minMoney / 100}~${this.gameArr.maxMoney / 100}`
        this.rlblGameInfo.string = infoStr

        this.node.getChildByName("sprBg").width = this.rlblGameInfo.node.width + 10
    }

    startBetFun(eventName: string, remainTime: number = 0) {
        if (remainTime > 0) {
            this.updateView()
        }
    }

    gameEnterBackGround(eventName: string, isBackGround: boolean = true) {
        let self = this
        this.isBackGround = isBackGround

        if (!isBackGround) {
            FuncUtil.delayFunc(function() {
                self.updateView()
            }, 0.5, self.node)
        }
    }
}
