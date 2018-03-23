const { ccclass, property } = cc._decorator;
import { GameManager } from "../../common/manager/GameManager";
import { ResConfig as ResCfg } from "../../common/util/ResConfig";
import { MainController } from "../../module/main/controller/MainController";
import { EmitterManager as Emitter } from "../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../app/config/EmitterConfig"
import { FactoryUtil } from "../../common/util/FactoryUtil";
import { GameModel } from "../../module/game/model/GameModel"
import { GameCollectManager as GameColMgr } from "../manager/GameCollectManager"
@ccclass
export default class Tionrobzhuang extends cc.Component {

    //tionrob: number = 0;  //庄位 闲位  //已抢 1    排队   2
    myzhang: number = 0;  //自己是否抢庄  //1  抢庄  2下庄  0默认 3排队
    Qualifications: boolean = true;//是否有下注  //true 没有  false 有

    onLoad() {
        GameManager.instance.registerModelChanged("COMMON_ROB_ZHUANG_CHANGE", this.receptionrobzhuangFun, this); //抢庄
        GameManager.instance.registerModelChanged("COMMON_TIONRONROBZHUANG", this.tionrobzhuangFun, this); //开始投注
        GameManager.instance.registerModelChanged("COMMON_BETTING_SUCC_CHANGE", this.myQualificationsFun, this);//投注成功
        GameManager.instance.registerModelChanged("COMMON_START_AWARD_CHANGE", this.TheLotteryJudgeFun, this);    //开始发牌

        this.init()
    }

    onDestroy() {
        GameManager.instance.unregisterModelChanged("COMMON_ROB_ZHUANG_CHANGE", this.receptionrobzhuangFun, this); //抢庄
        GameManager.instance.unregisterModelChanged("COMMON_TIONRONROBZHUANG", this.tionrobzhuangFun, this);
        GameManager.instance.unregisterModelChanged("COMMON_BETTING_SUCC_CHANGE", this.myQualificationsFun, this);
        GameManager.instance.unregisterModelChanged("COMMON_START_AWARD_CHANGE", this.TheLotteryJudgeFun, this);
    }

    InitializationFun() {
        let gameName = GameColMgr.instance.getGameTag()

    }

    myQualificationsFun() {
        this.Qualifications = false;
    }

    init() {
        let gamedata = GameManager.instance.getEnterGame()
        let gameName = GameColMgr.instance.getGameTag()
        let gamerob = GameManager.instance.getplayerrob()
        ResCfg.loadPlist(this, gameName, function (self, Asste) {
            let sprGrab = self.node.getChildByName("sprGrab").getComponent(cc.Sprite)
            let btnGrab = self.node.getChildByName("btnGrab").getComponent(cc.Button)
            let sprbtnGrab = self.node.getChildByName("btnGrab").getComponent(cc.Sprite)
            sprGrab.spriteFrame = Asste.getSpriteFrame("zhuang-txt_grab");
            sprbtnGrab.spriteFrame = Asste.getSpriteFrame("zhuang-btn_grab_0");
            if (gamedata.state == 1) {
                btnGrab.interactable = false;
                let sprGrab = self.node.getChildByName("sprGrab").getComponent(cc.Sprite);
                sprGrab.spriteFrame = Asste.getSpriteFrame("zhuang-txt_grab_no");
            }

            let gamerob = GameManager.instance.getjudgePlayerrob()
          //  cc.log(gamerob)
            if (gamerob == 0) {
                self.myzhang = 2;
                btnGrab.interactable = false
                Emitter.fire(EmitterCfg.GAME_ROB_ZHUANG, 0)
                sprGrab.spriteFrame = Asste.getSpriteFrame("zhuang-txt_even_no");
                FactoryUtil.createAlertConfirmView("已取消连庄！等待本局结束")
            }
            // if(gamerob==5){
            //     self.myzhang = 2;
            //     btnGrab.interactable = false
            //     Emitter.fire(EmitterCfg.GAME_ROB_ZHUANG, 0)
            //     sprGrab.spriteFrame = Asste.getSpriteFrame("zhuang-txt_even_no");
            //     FactoryUtil.createAlertConfirmView("已取消连庄！等待本局结束")
            // }
            let BetTotal = GameManager.instance.getMySucBetTotal()
            if (BetTotal > 0) {
                self.myQualificationsFun()
            }

        }, true)



    }

    TheLotteryJudgeFun() {
        if (this.myzhang == 0) {
            let btnGrab = this.node.getChildByName("btnGrab").getComponent(cc.Button)
            btnGrab.interactable = false;
            let gameName = GameColMgr.instance.getGameTag()
            ResCfg.loadPlist(this, gameName, function (self, Asste) {
                let sprGrab = self.node.getChildByName("sprGrab").getComponent(cc.Sprite)
                sprGrab.spriteFrame = Asste.getSpriteFrame("zhuang-txt_grab_no");
            }, true)
        }
    }

    tionrobzhuangFun() {
        this.Qualifications = true;
        let btnGrab = this.node.getChildByName("btnGrab").getComponent(cc.Button)
        btnGrab.interactable = true
        let gameName = GameColMgr.instance.getGameTag()
        ResCfg.loadPlist(this, gameName, function (self, Asste) {
            let sprGrab = self.node.getChildByName("sprGrab").getComponent(cc.Sprite)
            if (self.myzhang == 2) {
                self.myzhang = 0;

                FactoryUtil.createAlertConfirmView("已下庄，快快下注吧！")
                sprGrab.spriteFrame = Asste.getSpriteFrame("zhuang-txt_grab");
            } else if (self.myzhang == 0) {
                sprGrab.spriteFrame = Asste.getSpriteFrame("zhuang-txt_grab");
            }
        }, true)


    }

    //接收抢庄
    receptionrobzhuangFun(eventName: string, aegs) {
        if(!cc.isValid(this.node)) return;
        let gameName = GameColMgr.instance.getGameTag()
        ResCfg.loadPlist(this, gameName, function (self, Asste) {
            let sprgrabs = self.node.getChildByName("sprGrab").getComponent(cc.Sprite)
            let btnGrab = self.node.getChildByName("btnGrab").getComponent(cc.Button)
            if (aegs.rob == 1) {
                sprgrabs.spriteFrame = Asste.getSpriteFrame("zhuang-txt_even");
                FactoryUtil.createAlertConfirmView("抢庄成功！\n已连庄，需手动下庄。")
                self.myzhang = 1;
                Emitter.fire(EmitterCfg.GAME_ROB_ZHUANG, 1)
                GameModel.instance.cancelBetJetton()
            } else if (aegs.rob == 2) {
                self.myzhang = 1;
                sprgrabs.spriteFrame = Asste.getSpriteFrame("zhuang-txt_cancel");
                FactoryUtil.createAlertConfirmView("已加入抢庄，需手动取消！")
            } else if (aegs.rob == 3) {
                FactoryUtil.createAlertConfirmView("余额不足")
            } else if (aegs.rob == 4) {
                if (aegs.playerId) return;
                self.myzhang = 0;
                btnGrab.interactable = false
                sprgrabs.spriteFrame = Asste.getSpriteFrame("zhuang-txt_cancel_no");
                FactoryUtil.createAlertConfirmView("已取消抢庄！等待本局结束")
            } else if (aegs.rob == 5) {
                self.myzhang = 2;
                btnGrab.interactable = false
                Emitter.fire(EmitterCfg.GAME_ROB_ZHUANG, 0)
                sprgrabs.spriteFrame = Asste.getSpriteFrame("zhuang-txt_even_no");
                FactoryUtil.createAlertConfirmView("已取消连庄！等待本局结束")
            }
        }, true)
    }

    //抢庄
    btnrobzhuangFun() {
        let gameState = GameManager.instance.getGamePlayState()
        if (gameState) {
            if (this.Qualifications) {
                if (this.myzhang == 0) {
                    MainController.instance.C_RobBanker(1)
                } else {
                    MainController.instance.C_RobBanker(0)
                }
            } else {
                FactoryUtil.createAlertConfirmView("您已下注！请耐心等待下一回合")
            }
        } else {
            FactoryUtil.createAlertConfirmView("无法抢庄！您不在牌桌上！")
        }


    }
}
