import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { AnimationMgr } from "../../../../common/manager/AnimationMgr";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import {FuncUtil} from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator
@ccclass
export default class GameBall extends cc.Component {
    ballpic = []
    remainTime: number = 0      //倒计时
    @property(cc.ParticleSystem)
    animball: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    animdian: cc.ParticleSystem = null;
    onLoad() {
        this.animball.playOnLoad = false
        this.animball.autoRemoveOnFinish = false
        this.animdian.playOnLoad = false
        this.animdian.autoRemoveOnFinish = false
        let self = this
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // if (self.canTouch) {
            self.node.active = false
            // }
            event.stopPropagation()
        })
    }

    onDestroy() {
        this.unschedule(this.updateFun)
    }

    onEnable() {
        Emitter.register(EmitterCfg.GAME_BALL_SHOW, this.showBallViewdFun, this)
        // GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
    }

    onDisable() {
        Emitter.unregister(EmitterCfg.GAME_BALL_SHOW, this.showBallViewdFun, this)
        // GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
    }

    protected updateFun() {
        this.remainTime -= 1
        if (this.remainTime <= 0) {
            this.unschedule(this.updateFun)
            this.node.active = false
        }
    }

    startAwardFun() {
        this.particleEffectPlayback()
        this.schedule(this.updateFun, 1)
    }

    showBallViewdFun(eventName: string, remainTime: number = 0) {
        this.remainTime = remainTime

        this.particleEffectPlayback()
        this.schedule(this.updateFun, 1)
    }

    particleEffectPlayback(){
        this.animball.resetSystem()
        this.animdian.resetSystem()
        this.node.getChildByName("nodecurtain").active=true
        let self = this
        let gamelose = new AnimationMgr(self.node.getChildByName("animguang"), "balltai",1)
        gamelose.play()
        FuncUtil.delayFunc(function () {
            self.animball.stopSystem()
            self.animdian.stopSystem()
            self.node.getChildByName("nodecurtain").active=false
        }, 2, self.node)
        this.receiveBallFun()
    }

    receiveBallFun() {
        let cardsList = GameManager.instance.getCardTotals()
        ResCfg.loadPrefab(this, "framBrand", function (self, prefab) {
            for (let i = 0; i < 20; i++) {
                if (cc.isValid(self.ballpic[i])) self.ballpic[i].destroy()
                self.ballpic[i] = cc.instantiate(prefab)
                self.node.getChildByName('nodeLay').addChild(self.ballpic[i])
                self.ballpic[i].getComponent("FramBrandBg").updateItemBallFun(cardsList[i])
            }
        })
    }
}
