import { GameManager } from "../../../../common/manager/GameManager"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { AudioManager } from "../../../../common/manager/AudioManager"
import { TimeUtil } from "../../../../common/util/TimeUtil"
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
const { ccclass, property } = cc._decorator

@ccclass
export default class GameCards extends cc.Component {
    cardOpacity: number = 0         //牌透明度
    cardRotation: number = 0        //牌旋转
    cardScale: number = 1           //牌缩放
    cardBeginPos = null
    cardsEndPos = []
    cardsEndSca: number = null

    playersMax: number = 0          //玩家最大数
    cardsMax: number = 0            //玩家牌最大数

    totalTime = 0
    isBackGround: boolean = false

    onLoad() {
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        Emitter.register(EmitterCfg.GAME_START_FA_PAI, this.startFaPaiFun, this)
        Emitter.register(EmitterCfg.GAME_START_FAN_PAI, this.startFanPaiFun, this)

        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.clearPai, this)

        this.initView()
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        Emitter.unregister(EmitterCfg.GAME_START_FA_PAI, this.startFaPaiFun, this)
        Emitter.unregister(EmitterCfg.GAME_START_FAN_PAI, this.startFanPaiFun, this);

        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.clearPai, this)

        this.node.stopAllActions()
        // this.node.resumeAllActions()
        // this.node.pauseAllActions()
    }

    setCardsCfg(playersMax: number = 0, cardsMax: number = 0) {
        this.playersMax = playersMax
        this.cardsMax = cardsMax
    }

    iniCardsCfg() {

        let self = this
        for (let i = 0; i < self.cardsMax; i++) {
            for (let j = 1; j <= self.playersMax; j++) {
                let idx = j
                if (j == self.playersMax) {
                    idx = 0
                }

                let nodePlayer = self.node.getChildByName(`nodePlayer${idx}`)
                let nodeCard = nodePlayer.getChildByName(`brandItem${i}`)

                if (self.cardsEndPos[idx] == null) {
                    self.cardsEndPos[idx] = []
                }
                if (self.cardsEndPos[idx][i] == null) {
                    self.cardsEndPos[idx][i] = nodeCard.getPosition()
                }

                if (self.cardsEndSca == null) {
                    self.cardsEndSca = nodeCard.scale
                }
            }
        }
    }

    initView() {
        let nodeFapai = this.node.getChildByName("nodeFapai")

        this.cardRotation = nodeFapai.rotation
        this.cardScale = nodeFapai.scale
        this.cardBeginPos = nodeFapai.convertToWorldSpaceAR(cc.v2(0, 0))

        this.iniCardsCfg()
    }

    gameEnterBackGround(eventName: string, isBackGround: boolean = true) {
        let gameState = GameManager.instance.getGameState()

        this.isBackGround = isBackGround
        if (!isBackGround) {
            if (gameState == 1) {
                this.node.active = true
                // this.showPai()
            } else {
                this.clearPai()
            }
        } else {
            this.node.stopAllActions()
            this.clearPai()
        }
    }

    showPai() {
        this.node.active = true

        let self = this
        let startAward = GameManager.instance.getStartAward()
        let gameState = GameManager.instance.getGameState()
        cc.log(startAward)
        if(startAward.length<=0){
            return;
        }
        if (gameState == 1) {  //开奖阶段
        } else {
            this.clearPai()
            return
        }

        let delayTime = 0.01
        let idx = 0

        for (let i = 0; i < self.cardsMax; i++) {
            for (let j = 1; j <= self.playersMax; j++) {
                idx++

                FuncUtil.delayFunc(function () {
                    let idx = j
                    if (j == self.playersMax) {
                        idx = 0
                    }
                    
                    let nodePlayer = self.node.getChildByName(`nodePlayer${idx}`)
                    let nodeCard = nodePlayer.getChildByName(`brandItem${i}`)

                    let cardEndPos = self.cardsEndPos[idx][i]
                    nodeCard.setPosition(cardEndPos)

                    nodeCard.opacity = 255
                    nodeCard.rotation = 0
                    nodeCard.scale = self.cardsEndSca

                    nodeCard.getComponent("BrandItem").brandItemFun(startAward[idx].numbers[i])
                    nodeCard.getChildByName("sprBack").active = false
                    nodeCard.getChildByName("sprBg").scaleX = 1

                    nodeCard.opacity = 255
                }, delayTime * idx, self.node)
            }
        }

        Emitter.fire(EmitterCfg.GAME_END_COMPARE_PAI, true)
    }

    clearPai() {
        let self = this
        self.node.active = false
        FuncUtil.delayFunc(function () {
            Emitter.fire(EmitterCfg.GAME_RECORD)
        }, 0.01, this.node.parent)

        for (let j = 1; j <= self.playersMax; j++) {
            for (let i = 0; i < self.cardsMax; i++) {
                let idx = j
                if (j == self.playersMax) {
                    idx = 0
                }

                let nodePlayer = self.node.getChildByName(`nodePlayer${idx}`)
                let nodeCard = nodePlayer.getChildByName(`brandItem${i}`)

                nodeCard.getChildByName("sprBack").scaleX = 1
                nodeCard.getChildByName("sprBack").active = true

                nodeCard.setPosition(nodeCard.parent.convertToNodeSpaceAR(self.cardBeginPos))
                nodeCard.opacity = self.cardOpacity
                nodeCard.rotation = self.cardRotation
                nodeCard.scale = self.cardScale
            }
        }

        self.totalTime = 0
    }

    startFaPaiFun() {
        this.clearPai()

        let gameEndTime = GameManager.instance.getGameEndTime()
        let gameName = GameColMgr.instance.getGameTag()
        if (gameName != "longhudou") {
            if (TimeUtil.getRemainTime(gameEndTime) < 15) {
                this.showPai()
                return
            }
        }
        this.node.active = true

        let self = this
        let startAward = GameManager.instance.getStartAward()

        cc.log(startAward)
        if(startAward.length<=0){
            return;
        }
        let delayTime = 0.10
        let idx = 0

        // FuncUtil.delayFunc(function () {
        for (let i = 0; i < self.cardsMax; i++) {
            for (let j = 1; j <= self.playersMax; j++) {
                idx++
                // self.totalTime = delayTime * idx

                FuncUtil.delayFunc(function () {
                    let idx = j
                    if (j == self.playersMax) {
                        idx = 0
                    }

                    let nodePlayer = self.node.getChildByName(`nodePlayer${idx}`)
                    let nodeCard = nodePlayer.getChildByName(`brandItem${i}`)

                    nodeCard.getComponent("BrandItem").brandItemFun(startAward[idx].numbers[i])

                    nodeCard.getChildByName("sprBack").scaleX = 1
                    nodeCard.getChildByName("sprBack").active = true

                    let cardEndPos = self.cardsEndPos[idx][i]
                    nodeCard.setPosition(nodeCard.parent.convertToNodeSpaceAR(self.cardBeginPos))

                    nodeCard.opacity = self.cardOpacity
                    nodeCard.rotation = self.cardRotation
                    nodeCard.scale = self.cardScale

                    AudioManager.instance.playEffect("eff_fapai")

                    let time = 0.1
                    let act = cc.sequence(cc.fadeIn(0.01), cc.spawn(cc.moveTo(time, cardEndPos), cc.rotateTo(time, 0), cc.scaleTo(time, self.cardsEndSca)), cc.callFunc(function () {
                        if (i == self.cardsMax - 1 && j == self.playersMax) {
                            self.totalTime = 0
                            FuncUtil.delayFunc(function () {
                                AudioManager.instance.playEffect("eff_fanpai")
                                self.startFanPaiFun()
                            }, 1, nodeCard)
                        }
                    }))

                    if (!self.isBackGround) {
                        nodeCard.runAction(act)
                    }
                }, delayTime * idx, self.node)
            }
        }
        // }, self.totalTime, self.node)
    }

    startFanPaiFun() {
        let self = this
        let idx = 0
        let delayTime = 0.01

        for (let j = 1; j <= self.playersMax; j++) {
            for (let i = 0; i < self.cardsMax; i++) {
                idx++

                FuncUtil.delayFunc(function () {
                    let idx = j
                    if (j == self.playersMax) {
                        idx = 0
                    }

                    let nodePlayer = self.node.getChildByName(`nodePlayer${idx}`)
                    let nodeCard = nodePlayer.getChildByName(`brandItem${i}`)
                    if (!self.isBackGround) {
                        nodeCard.getChildByName("sprBg").scaleX = 0.4
                        nodeCard.getChildByName("sprBack").runAction(cc.sequence(cc.scaleTo(0.1, 0.5, 1), cc.callFunc(function () {
                            nodeCard.getChildByName("sprBg").runAction(cc.scaleTo(0.1, 1, 1))
                            nodeCard.getChildByName("sprBack").active = false
                            nodeCard.getChildByName("sprBg").scaleX = 1

                            if (i == self.cardsMax - 1 && j == self.playersMax) {
                                FuncUtil.delayFunc(function () {
                                    let gameEndTime = GameManager.instance.getGameEndTime()
                                    let gameName = GameColMgr.instance.getGameTag()
                                    if (gameName == "longhudou") {
                                        if (TimeUtil.getRemainTime(gameEndTime) < 1) {
                                            Emitter.fire(EmitterCfg.GAME_END_COMPARE_PAI, true)
                                            return;
                                        }
                                    }else{
                                        if (TimeUtil.getRemainTime(gameEndTime) < 13) {
                                            Emitter.fire(EmitterCfg.GAME_END_COMPARE_PAI, true)
                                            return;
                                        }
                                    }

                                    Emitter.fire(EmitterCfg.GAME_START_COMPARE_PAI, 1)

                                }, 1, nodeCard)
                            }
                        })))
                    }
                }, delayTime * idx, self.node)
            }
        }
    }

}