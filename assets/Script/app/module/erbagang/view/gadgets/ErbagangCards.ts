import { GameManager } from "../../../../common/manager/GameManager"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import GameCards from "../../../game/view/gadgets/GameCards"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator

@ccclass
export default class ErbagangCards extends GameCards {
    cardOpacity: number = 0         //牌透明度

    playersMax: number = 0          //玩家最大数
    cardsMax: number = 0            //玩家牌最大数
    onLoad() {
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()

    }


    initView() {
        this.clearPai()
    }

    //初始化
    clearPai() {
        this.cardOpacity=0;

        for (let i = 0; i < this.playersMax; i++) {
            for (let j = 0; j < this.cardsMax; j++) {

                let nodePlayer = this.node.getChildByName(`nodePlayer${i}`)
                let nodeCard = nodePlayer.getChildByName(`brandItem${j}`)

                nodeCard.opacity = this.cardOpacity
            }
        }
    }

    //中途加入
    showPai() {

        let startAward = GameManager.instance.getStartAward()
        if(startAward.length<=0){
            return;
        }
        this.playersMax = startAward.length
        this.cardsMax = startAward[0].numbers.length
        for (let i = 0; i < this.playersMax; i++) {
            for (let j = 0; j < this.cardsMax; j++) {

                let nodePlayer = this.node.getChildByName(`nodePlayer${i}`)
                let nodeCard = nodePlayer.getChildByName(`brandItem${j}`)

                nodeCard.getComponent("MahjongItem").brandItemFun(startAward[i].numbers[j],false)
                nodeCard.getChildByName("sprBack").active = false
                nodeCard.opacity = 255
            }
        }
        Emitter.fire(EmitterCfg.GAME_END_COMPARE_PAI,true)

    }
    //发牌
    startFaPaiFun() {


        let startAward = GameManager.instance.getStartAward()
        if(startAward.length<=0){
            return;
        }
        this.playersMax = startAward.length
        this.cardsMax = startAward[0].numbers.length
        for (let i = 0; i <  this.playersMax; i++) {
            for (let j = 0; j < this.cardsMax; j++) {

                let nodePlayer = this.node.getChildByName(`nodePlayer${i}`)
                let nodeCard = nodePlayer.getChildByName(`brandItem${j}`)

                nodeCard.getComponent("MahjongItem").brandItemFun(startAward[i].numbers[j],false)
                nodeCard.getChildByName("sprBack").active = true
                nodeCard.opacity = 255
            }
        }
        let self = this
        FuncUtil.delayFunc(function () {
            for (let i = 0; i <  self.playersMax; i++) {
                for (let j = 0; j < self.cardsMax; j++) {
    
                    let nodePlayer = self.node.getChildByName(`nodePlayer${i}`)
                    let nodeCard = nodePlayer.getChildByName(`brandItem${j}`)
    
                    nodeCard.getComponent("MahjongItem").brandItemFun(startAward[i].numbers[j],false)
                    nodeCard.getChildByName("sprBack").active = false
                }
            }

            FuncUtil.delayFunc(function () {
                Emitter.fire(EmitterCfg.GAME_START_COMPARE_PAI, 1)
            }, 1, self.node)
        },4,self.node)

        
    }



}