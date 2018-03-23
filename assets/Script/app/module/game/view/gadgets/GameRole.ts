import { GameModel } from "../../model/GameModel"
import { GameManager, PlayerMsg } from "../../../../common/manager/GameManager"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { IconArr } from "../../../../../GameConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
const { ccclass, property } = cc._decorator

@ccclass
export default class GameRole extends cc.Component {

    @property(cc.Sprite)
    sprTou: cc.Sprite = null

    @property(cc.Label)
    lblName: cc.Label = null

    @property(cc.Label)
    lblID: cc.Label = null

    @property(cc.Label)
    lblBalance: cc.Label = null

    @property(cc.Label)
    lblUsableBalance: cc.Label = null

    zhuang: number = 0;

    onLoad() {
        GameManager.instance.registerModelChanged("COMMON_UPDATE_GOLD_CHANGE", this.updateGoldChange, this)
        GameModel.instance.registerModelChanged("GAME_UPDATE_JETTON_CHANGE", this.updateJettonChange, this)
        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.statezhuangFun, this)
        Emitter.register(EmitterCfg.GAME_ROB_ZHUANG, this.lianZhunFun, this)
        Emitter.register(EmitterCfg.GAME_END_COMPARE_PAI, this.updateGoldChange, this)

        this.playerMsgChange()
    }

    onDestroy() {
        GameManager.instance.unregisterModelChanged("COMMON_UPDATE_GOLD_CHANGE", this.updateGoldChange, this)
        GameModel.instance.unregisterModelChanged("GAME_UPDATE_JETTON_CHANGE", this.updateJettonChange, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.statezhuangFun, this)
        Emitter.unregister(EmitterCfg.GAME_ROB_ZHUANG, this.lianZhunFun, this)
        Emitter.unregister(EmitterCfg.GAME_END_COMPARE_PAI, this.updateGoldChange, this)
    }

    updateGoldChange1() {
        let playerMsg = GameManager.instance.getPlayerMsg()
        this.lblUsableBalance.string = FuncUtil.formatNum(playerMsg.usableGold, true)
    }

    updateGoldChange() {
        let playerMsg = GameManager.instance.getPlayerMsg()
        this.lblBalance.string = FuncUtil.formatNum(playerMsg.gold)

        this.lblUsableBalance.string = FuncUtil.formatNum(playerMsg.usableGold, true)
    }

    updateJettonChange(eventName: string, gold, usableGold) {
        this.lblBalance.string = FuncUtil.formatNum(gold)
        this.lblUsableBalance.string = FuncUtil.formatNum(usableGold, true)
    }

    playerMsgChange() {
        let playerMsg = GameManager.instance.getPlayerMsg()
        let playerIconId = playerMsg.iconId.toString()
        if (playerIconId == "0") {
            playerIconId = GameColMgr.instance.getGameTag()
        }

        this.lblName.string = playerMsg.playerName
        this.lblID.string = playerMsg.playerId.toString()

        ResCfg.loadPlist(this, "common", function (self, sprit) {
            let headPath = sprit.getSpriteFrame(IconArr[playerIconId].icon)
            self.sprTou.spriteFrame = headPath
        })
        let gamerob = GameManager.instance.getjudgePlayerrob()
        let nodeMark = this.node.getChildByName("sprMark")
        nodeMark.active = gamerob == 0
        this.updateGoldChange()
    }

    lianZhunFun(eventName: string, myzhuang) {
        this.zhuang = myzhuang;
        if (this.zhuang == 1) {
            this.statezhuangFun();
        }
    }

    statezhuangFun() {
        let self = this
        let nodeMark = self.node.getChildByName("sprMark")
        if (nodeMark.active == false && this.zhuang == 0) return;
        nodeMark.active = this.zhuang == 1
    }
}
