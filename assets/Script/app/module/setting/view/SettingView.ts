import BaseView from "../../../common/baseui/BaseView";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { SettingModel } from "../model/SettingModel";
import { SettingController } from "../controller/SettingController";
import { SettingModule } from "../SettingModule";
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { MainController } from "../../main/controller/MainController";
import { GameManager } from "../../../../app/common/manager/GameManager";
import { TonghuashunModel } from "../../tonghuashun/model/TonghuashunModel";
import { GameController } from "../../game/controller/GameController"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"
import { FuncUtil } from "../../../common/util/FuncUtil"
import { HelpFunc } from "../../../common/util/HelpFunc"
import { LoginModule } from "../../login/LoginModule"
import { MainModule } from "../../main/MainModule"


const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingView extends BaseView {
    @property(cc.Button)
    btnExit: cc.Button = null;
    @property(cc.Node)
    HelpTipsNode: cc.Node = null;
    @property(cc.Node)
    MusicNode: cc.Node = null;
    @property(cc.Node)
    SoundNode: cc.Node = null;
    @property(cc.Node)
    nodename: cc.Node = null;

    openMusic: boolean = false;
    openEffect: boolean = false;
    heip: boolean = false;

    onLoad() {
        let gameTag = GameColMgr.instance.getGameTag()
        if (gameTag == null && HelpFunc.isIOS()) {
            this.btnExit.node.active = false
            // this.node.getChildByName("sprExit").active = false
        }

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })

        this.heip = true

        this.openMusic = cc.sys.localStorage.getItem("MUSIC_OPEN") == 0
        this.openEffect = cc.sys.localStorage.getItem("EFFECT_OPEN") == 0

        //////////cc.log(this.openMusic, this.openEffect)

        if (!this.openMusic) {
            this.operationmusicFun(this.MusicNode, !this.openMusic, false)
        }

        if (!this.openEffect) {
            this.operationmusicFun(this.SoundNode, !this.openEffect, false)
        }

        if (!this.heip) {
            this.operationmusicFun(this.HelpTipsNode, !this.heip, false)
        }
        Emitter.register(EmitterCfg.GAME_EXIT_GAME, this.quiteGameSucc, this)

        this.initjudgegame()
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GAME_EXIT_GAME, this.quiteGameSucc, this)
        
        // GameManager.instance.unregisterModelChanged("COMMON_DEL_ROOM_PLAYER_MSG_CHANGE", this.upPlayerLeaveFun, this);
    }

    initjudgegame() {
        let gameTag = GameColMgr.instance.getGameTag()
        if (gameTag != null) {
            this.node.getChildByName("btnExit").active=false
            // ResCfg.loadPlist(this, "setting", function (self, Asste) {
            //     let assreturn = Asste.getSpriteFrame("setting_main-btn_exit");
            //     self.node.getChildByName("sprExit").getComponent(cc.Sprite).spriteFrame = assreturn
            // })
        }
        
    }


    quiteGameSucc() {
        this.btnCloseCallBackFun()
    }

    btnMusicFun() {
        this.openMusic = this.operationmusicFun(this.MusicNode, this.openMusic)
        SettingModel.instance.setOpenMusic(!this.openMusic)
    }

    btnSoundFun() {
        this.openEffect = this.operationmusicFun(this.SoundNode, this.openEffect)
        SettingModel.instance.setOpenEffect(!this.openEffect)
    }

    btnHelpTipsFun() {
        this.heip = this.operationmusicFun(this.HelpTipsNode, this.heip)
    }

    operationmusicFun(mcnode, bool, needAct: boolean = true) {
        let change = this.nodename.name
        let sprMusic = cc.find("sprdiBg/btnQiu", mcnode);
        let Music = sprMusic.getComponent(cc.Sprite);

        let txtMusic = cc.find("sprdiBg/sprOpen", mcnode);
        let Open = txtMusic.getComponent(cc.Sprite);

        let action
        let time = 0
        if (needAct) {
            time = 0.2
        }
        ////cc.log("bool: ", bool)
        if (bool) {
            ResCfg.loadPlist(this, "setting", function (self, Asste) {
                if (change == "sprmain") {
                    Open.spriteFrame = Asste.getSpriteFrame("setting_main-txt_open");
                    Music.spriteFrame = Asste.getSpriteFrame("setting_main-icon_round_white");
                }
                else if (change == "sprtonghuashun") {
                    Open.spriteFrame = Asste.getSpriteFrame("setting_tonghuashun-txt_open");
                }
                else if (change == "sprlonghudou") {
                    Open.spriteFrame = Asste.getSpriteFrame("setting_longhudou-txt_open");
                    Music.spriteFrame = Asste.getSpriteFrame("setting_longhudou-btn_audio_1");
                }
            })
            action = cc.moveBy(time, cc.p(30, 0));
        }
        else {
            ResCfg.loadPlist(this, "setting", function (self, Asste) {
                if (change == "sprmain") {
                    Open.spriteFrame = Asste.getSpriteFrame("setting_main-txt_kuan");
                    Music.spriteFrame = Asste.getSpriteFrame("setting_main-icon_round_black");
                }
                else if (change == "sprtonghuashun") {
                    Open.spriteFrame = Asste.getSpriteFrame("setting_tonghuashun-txt_shut");
                }
                else if (change == "sprlonghudou") {
                    Open.spriteFrame = Asste.getSpriteFrame("setting_longhudou-txt_shut");
                    Music.spriteFrame = Asste.getSpriteFrame("setting_longhudou-btn_audio_0");
                }
            })
            action = cc.moveBy(time, cc.p(-30, 0))
        }

        Music.node.runAction(action);
        return !bool
    }

    btnCloseCallBackFun() {
        SettingController.instance.closeCallBackFun()
    }

    btnExitCallBackFun() {
        this.btnCloseCallBackFun()
        let gameTag = GameColMgr.instance.getGameTag()
        if (gameTag == null) {
            if (cc.sys.isNative) {
                cc.director.end()
            }
        } else {
            GameController.instance.C_QuiteGame()
        }
    }
}