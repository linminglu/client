import { SettingModule } from "../../../setting/SettingModule"
import { MainController } from "../../../main/controller/MainController"
import { GameController } from "../../../game/controller/GameController"
import { GameManager, PlayerMsg } from "../../../../common/manager/GameManager"
import { GameModel } from "../../model/GameModel"
import { GameCfg } from "../../../../../GameConfig"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { HelpModule } from "../../../help/HelpModule"
import { LoginController } from "../../../login/controller/LoginController"
import { RecordModule } from "../../../record/RecordModule"
import { TimeUtil } from "../../../../common/util/TimeUtil"
import { PacketModel } from "../../../packet/model/PacketModel"
import { PacketController } from "../../../packet/controller/PacketController"
import { PacketModule } from "../../../packet/PacketModule"
import { ChatModule } from "../../../chat/ChatModule"
import { FactoryUtil } from "../../../../common/util/FactoryUtil";
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"

const { ccclass, property } = cc._decorator

@ccclass
export default class GameBtn extends cc.Component {

    myzhuang: number = 0;  //自己是否抢庄  //1  抢庄  2下庄  0默认

    @property(cc.Button)
    btnSetting: cc.Button = null

    @property(cc.Button)
    btnStand: cc.Button = null

    @property(cc.Button)
    btnSitDown: cc.Button = null

    @property(cc.Button)
    btnChat: cc.Button = null

    @property(cc.Button)
    btnConfirmJetton: cc.Button = null

    @property(cc.Button)
    btnRepeatJetton: cc.Button = null

    @property(cc.Button)
    btnCancelJetton: cc.Button = null

    @property(cc.Node)
    gameJetton: cc.Node = null
 
    onLoad() {
        GameManager.instance.registerModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameManager.instance.registerModelChanged("COMMON_GAME_STATE_CHANGE", this.downandStandFun, this)
        GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        GameManager.instance.registerModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)

        GameManager.instance.registerModelChanged("COMMON_BETTING_SUCC_CHANGE", this.betingSucc, this)
        GameManager.instance.registerModelChanged("COMMON_END_BET_CHANGE", this.startAwardFun, this)

        Emitter.register(EmitterCfg.GAME_ROB_ZHUANG, this.MyVillageFun, this)
        this.initView()
    }

    onDestroy() {
        GameManager.instance.unregisterModelChanged("COMMON_ENTER_GAME_MSG_CHANGE", this.enterGame, this)
        GameManager.instance.unregisterModelChanged("COMMON_GAME_STATE_CHANGE", this.downandStandFun, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.startAwardFun, this)
        GameManager.instance.unregisterModelChanged("COMMON_START_BET_CHANGE", this.startBetFun, this)

        GameManager.instance.unregisterModelChanged("COMMON_BETTING_SUCC_CHANGE", this.betingSucc, this)
        GameManager.instance.unregisterModelChanged("COMMON_END_BET_CHANGE", this.startAwardFun, this)

        Emitter.unregister(EmitterCfg.GAME_ROB_ZHUANG, this.MyVillageFun, this)
    }

    initView() {
        let BetTotal=GameManager.instance.getMySucBetTotal()  
        this.downandStandFun()
        let GameState = GameManager.instance.getGameState()
        this.updateView(GameState == 0)
        let gamerob = GameManager.instance.getjudgePlayerrob()
         if (gamerob == 0) this.startAwardFun();

    }

    enterGame() {
        let enterGameMsg = GameManager.instance.getEnterGame()
        let gameState = GameManager.instance.getGameState()

        if (gameState == 1) {  //开奖阶段
            this.updateView(false)
        } else {
            let gameEndTime = GameManager.instance.getGameEndTime()
            this.updateView(TimeUtil.getRemainTime(gameEndTime) > 3)
        }
    }

    MyVillageFun(eventName: string, value: number) {
        this.myzhuang = value;
        if (value) {
            this.startAwardFun();
        }
    }

    startAwardFun() {
        this.updateView(false)
    }

    startBetFun(eventName: string, remainTime: number = 0, endTime: number) {
        let gameState = GameManager.instance.getGamePlayState()
        
        if (gameState == 0) return;
        if (this.myzhuang == 1) return;

        let self = this
        FuncUtil.delayFunc(function() {
            self.updateView(remainTime > GameCfg.GAME_BET_END_TIME)
        }, 0.1, self.node)
    }

    betingSucc() {
        this.btnStand.interactable = false
    }

    updateView(state) {
        this.btnConfirmJetton.node.active = state
        this.btnRepeatJetton.node.active = state
        this.btnCancelJetton.node.active = state
        this.btnStand.interactable = state
        let BetTotal=GameManager.instance.getMySucBetTotal()  
        if(BetTotal>0){
            this.btnStand.interactable = false
        }
        this.gameJetton.active = state
        Emitter.fire(EmitterCfg.GAME_BETAREA, state)
    }

    downandStandFun() {
        let gameState = GameManager.instance.getGamePlayState()
        
        let isSitDown = false
        if (gameState == 0) {
            isSitDown = true
        }
        this.btnSitDown.node.active = isSitDown
        this.btnStand.node.active = !isSitDown
        let enterGameMsg = GameManager.instance.getGameState()
        if (enterGameMsg == 1) return;
        if (this.btnSitDown.node.active == true) {
            this.updateView(false)
        } else {
            this.updateView(true)
        }
    }

    upsuoyouFun() {

    }

    btnSettingCallBack() {
        SettingModule.instance.show()
    }

    btnStandCallBack() {
        GameController.instance.C_PlayGame({ state: 0 })
    }

    btnSitDownCallBack() {
        GameController.instance.C_PlayGame({ state: 1 })
    }

    btnChatCallBack() {
        ChatModule.instance.show()
    }

    btnGrabCallBack() {

    }

    btnPacketCallBack() {
        Emitter.fire(EmitterCfg.MAIN_PROMPT, "close", "packet");
        PacketModel.instance.setChioiceFun(2,"game")
        PacketModule.instance.show()

    }

    canConfirm = true
    btnConfirmJettonCallBack() {
        let self = this
        if (self.canConfirm) {
            FuncUtil.delayFunc(function () {
                self.canConfirm = true
            }, 0.6, this.node)

            self.canConfirm = false

            GameModel.instance.confirmBetJetton()
        }
    }

    canRepeat = true
    btnRepeatJettonCallBack() {
        let self = this
        if (self.canRepeat) {
            FuncUtil.delayFunc(function () {
                self.canRepeat = true
            }, 0.6, this.node)
            
            self.canRepeat = false

            GameModel.instance.repeatBetJetton()
        }
    }

    btnCancelJettonCallBack() {
        GameModel.instance.cancelBetJetton()
    }

    btnHelpOpeCallBack() {
        HelpModule.instance.show();
    }

    btnRecordOpeCallBack() {
        RecordModule.instance.show();

    }

    btnExitCallBackFun() {

        let self = this;
        FactoryUtil.createAlertView({
            tipStr: "是否要退出该房间？",
            cancelObj: {
                txtName: "common-txt_cancel",          //图片名
                callBack: function () {     //按钮回调
                }
            },
            confirmObj: {
                txtName: "common-txt_confirm",         //图片名
                callBack: function () {      //按钮回调
                    let gameTag = GameColMgr.instance.getGameTag()
                    if (gameTag == null) {
                        if (cc.sys.isNative) {
                            cc.director.end()
                        }
                    } else {
                        GameController.instance.C_QuiteGame()
                    }
                }
            },
        })
    }
}
