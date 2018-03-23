import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import JettonBtn from "../../../../common/ui/JettonBtn"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { GameManager, PlayerMsg } from "../../../../common/manager/GameManager"
import { FuncUtil } from "../../../../common/util/FuncUtil"

import { GameModel } from "../../model/GameModel"

const { ccclass, property } = cc._decorator

@ccclass
export default class GameJetton extends cc.Component {
    jettonArr = null
    myzhang: number = 0;
    onLoad() {
        //GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        //GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        //GameManager.instance.registerModelChanged("COMMON_GAME_STATE_CHANGE", this.downandStandFun, this)
        //GameManager.instance.registerModelChanged("COMMON_END_BET_CHANGE", this.startAwardFun, this)
        //Emitter.register(EmitterCfg.GAME_ROB_ZHUANG, this.lianZhunFun, this)

        this.jettonArr = GameColMgr.instance.getJettonArr()
        this.initView()
        //let enterGameMsg = GameManager.instance.getEnterGame()
        //this.updateView(enterGameMsg.state == 0)
    }

    onDestroy() {
        //GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        //GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)
        //GameManager.instance.unregisterModelChanged("COMMON_GAME_STATE_CHANGE", this.downandStandFun, this)
        //GameManager.instance.unregisterModelChanged("COMMON_END_BET_CHANGE", this.startAwardFun, this)

        //Emitter.unregister(EmitterCfg.GAME_ROB_ZHUANG, this.lianZhunFun, this)
    }

    // lianZhunFun(eventName: string, args1) {
    //     this.myzhang = args1
    //     if (this.myzhang == 0) {
    //         return
    //     }
    //     this.startAwardFun()
    // }

    // downandStandFun(){
    //     let enterGameMsg = GameManager.instance.getEnterGame()
    //     if(enterGameMsg.state == 1)return;
    //     let gameState = GameManager.instance.getGamePlayState()

    //     if (gameState == 0) {
    //         this.startAwardFun();
    //     }else{
    //         this.startBetFun();
    //     }
    // }

    // startAwardFun() {
    //     this.updateView(false)
    // }

    // startBetFun() {
    //     let gameState = GameManager.instance.getGamePlayState()
    //     if(gameState==0)return;
    //     if(this.myzhang==1)return;
    //     this.updateView(true)
    // }

    // updateView(state) {
    //     this.node.active = state
    // }

    initView() {

        let self = this
        for (let i = 0; i < this.jettonArr.length; i++) {
            self.schedule(function () {
                let curJettonBtn = self.node.getChildByName(`jettonBtn${i}`)
                curJettonBtn.on('touchend', function (event) {
                    self.touchendCallBack(self.jettonArr[i])
                }, this)

                // ResCfg.loadPlist(this, "common", function (self, atlas) {
                //     self.node.getChildByName(`jettonBtn${i}`).getChildByName("sprJetton").getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(`jetton-${self.jettonArr[i].jettonImg}`)
                // })

                curJettonBtn.getComponent(JettonBtn).updateViewFun(self.jettonArr[i])
                // //////////cc.log(self.jettonArr[i])
                if (i == 0) {//默认选中最小的筹码
                    self.touchendCallBack(self.jettonArr[i])
                }

                let worldPos = curJettonBtn.convertToWorldSpaceAR(cc.v2(0, 0))
                GameModel.instance.setJettonWorldPos({ jettonNum: self.jettonArr[i].jettonNum, worldPos: worldPos })
            }, 0.01 * i, 0);
        }
    }

    touchendCallBack(data) {
        Emitter.fire(EmitterCfg.GAME_SELECT_JETTON, data)

        this.setCurSelectJetton(data)
    }

    setCurSelectJetton(data) {
        GameModel.instance.setCurSelectJetton(data)
    }
}
