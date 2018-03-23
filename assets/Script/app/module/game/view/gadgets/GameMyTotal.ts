import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { GameModel } from "../../model/GameModel"
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMyTotal extends cc.Component {

    onLoad() {
        Emitter.register(EmitterCfg.GAME_MY_TOTAL, this.myTotalMoney, this)

        GameManager.instance.registerModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.myInitTotalMoney, this)
        GameModel.instance.registerModelChanged("GAME_CONFIRM_BET_SUCC_CHANGE", this.initView, this)

        this.initView()
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GAME_MY_TOTAL, this.myTotalMoney, this)

        GameManager.instance.unregisterModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.myInitTotalMoney, this)
        GameModel.instance.unregisterModelChanged("GAME_CONFIRM_BET_SUCC_CHANGE", this.initView, this)

    }

    initView() {
        let total = GameManager.instance.getMySucBetTotal()
        this.updateView(total);
    }

    enterGame() {
        let gameState = GameManager.instance.getGameState()
        let betjettonNum = GameModel.instance.getBetjettonNum()

        if (gameState == 1) {  //开奖阶段
            this.updateView(0)
        } else {
            let total = GameManager.instance.getMySucBetTotal()
            this.updateView(total + betjettonNum)
        }
    }

    myTotalMoney(eventName: string, totalMoney) {
        this.updateView(totalMoney)
    }

    updateView(total: number = 0) {
        this.node.getChildByName("nodeMyTotalLay").getComponent("TotalUI").updateTatalFun(total)

    }

    myInitTotalMoney() {
        this.updateView(0);
    }
}
