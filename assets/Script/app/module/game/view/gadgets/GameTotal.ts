import {EmitterManager as Emitter} from "../../../../common/manager/EmitterManager"
import {EmitterCfg} from "../../../../../app/config/EmitterConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { GameModel } from "../../model/GameModel"
import {FuncUtil} from "../../../../common/util/FuncUtil"

const { ccclass, property } = cc._decorator

@ccclass
export default class GameTotal extends cc.Component {
    private isBackGround = false
    
    onLoad() {
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)

        GameManager.instance.registerModelChanged("COMMON_TOTAL_MONEY_CHANGE", this.synTotalMoney, this)
        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        
        this.initView()
    }
    
    onDestroy() {
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)

        GameManager.instance.unregisterModelChanged("COMMON_TOTAL_MONEY_CHANGE", this.synTotalMoney, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
    }

    initView() {
        let totalMoney = GameManager.instance.getTotalMoney()
        this.updateView(totalMoney)
    }

    synTotalMoney(eventName: string, msg) {
        if (this.isBackGround) {
            return
        }

        this.updateView(msg.totalMoney)
    }

    updateView(total: number = 0) {
        this.node.getChildByName("nodeTotalLay").getComponent("TotalUI").updateTatalFun(total)
    }

    startBetFun(eventName: string, remainTime: number = 0) {
        if (remainTime > 0) {
            this.updateView(0)
        }
    }

    gameEnterBackGround(eventName: string, isBackGround: boolean = true) {
        let self = this
        this.isBackGround = isBackGround
        if (!isBackGround) {
            FuncUtil.delayFunc(function() {
                self.initView()
            }, 0.5, self.node)
        }
    }
}
