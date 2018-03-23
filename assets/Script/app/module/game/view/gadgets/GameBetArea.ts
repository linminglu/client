import { GameManager } from "../../../../common/manager/GameManager"
import { GameCfg } from "../../../../../GameConfig"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"

const { ccclass, property } = cc._decorator

@ccclass
export default class GameBetArea extends cc.Component {
    private betAreaList = []        //下注区域列表
    protected childMaxNum = 0         //区域最大个数
    protected isCanTouch = false
    // private myzhang = 0

    onLoad() {
        // GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        // GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        // GameManager.instance.registerModelChanged("COMMON_END_BET_CHANGE", this.startAwardFun, this)
        // GameManager.instance.registerModelChanged("COMMON_GAME_STATE_CHANGE", this.downandStandFun, this)
         Emitter.register(EmitterCfg.GAME_BETAREA, this.monitorRegion, this)

        // let enterGameMsg = GameManager.instance.getEnterGame()
        // this.isCanTouch = enterGameMsg.state == 0

    }

    onDestroy() {
        // GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        // GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        // GameManager.instance.unregisterModelChanged("COMMON_END_BET_CHANGE", this.startAwardFun, this)
        // GameManager.instance.unregisterModelChanged("COMMON_GAME_STATE_CHANGE", this.downandStandFun, this)
         Emitter.unregister(EmitterCfg.GAME_BETAREA, this.monitorRegion, this)
    }


    monitorRegion(eventName: string, args1){
        this.isCanTouch=args1;
        this.setBetAreaState();
    }

    // downandStandFun() {
    //     let enterGameMsg = GameManager.instance.getEnterGame()
    //     if (enterGameMsg.state == 1) return;
    //     let gameState = GameManager.instance.getGamePlayState()
    //     this.isCanTouch = false
    //     if (gameState == 1) {
    //         this.isCanTouch = true
    //     }

    //     this.setBetAreaState();
    // }

    // lianZhunFun(eventName: string, args1) {
    //     ////cc.log("-----------lianZhunFun-------------")
    //     //////////cc.log(args1)
    //     this.myzhang = args1
    //     this.isCanTouch = false
    //     if (this.myzhang == 0) {
    //         let enterGameMsg = GameManager.instance.getEnterGame()
    //         let gamerob = GameManager.instance.getplayerrob()
    //         if (enterGameMsg.state == 1) return;
    //         this.isCanTouch = true
    //         if (gamerob == 5) {
    //             this.isCanTouch = false
    //         }
    //         this.setBetAreaState()
    //         return
    //     }
    //     this.setBetAreaState()
    // }

    protected setChildMaxNum(maxNum: number = 0) {
        this.childMaxNum = maxNum
        this.setBetAreaState()
    }

    private setBetAreaState() {
        for (let i = 1; i <= this.childMaxNum; i++) {
            // this.node.getChildByName(`betArea${i}`).active = this.isCanTouch
            this.node.getChildByName(`betArea${i}`).getComponent("BetArea").setTouchState(this.isCanTouch)
        }
    }

    // private startAwardFun(eventName: string, remainTime: number = 0, endTime: number) {

    //     this.isCanTouch = false
    //     this.setBetAreaState()
    // }

    // private startBetFun(eventName: string, remainTime: number = 0, endTime: number) {
    //     if (this.myzhang == 1) {
    //         return
    //     }

    //     this.isCanTouch = remainTime > GameCfg.GAME_BET_END_TIME
    //     this.setBetAreaState()
    // }
}
