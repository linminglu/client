import BaseView from "../../../common/baseui/BaseView";
import {EmitterManager as Emitter} from "../../../common/manager/EmitterManager";
import {EmitterCfg} from "../../../../app/config/EmitterConfig"
import {MainModel as Model} from "../model/MainModel";
import {MainController as Ctr} from "../controller/MainController";
import {MainModule} from "../MainModule";
import {AudioManager} from "../../../common/manager/AudioManager"
import {ChatModule} from    "../../chat/ChatModule"
import {LoginModule} from "../../login/LoginModule"
import { FuncUtil } from "../../../common/util/FuncUtil";
import { GameManager } from "../../../common/manager/GameManager"
import {NoticeModule as Notice } from  "../../notice/NoticeModule"
import { MainController} from "../controller/MainController"
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainView extends BaseView {
    @property(cc.Button)
    btnMain: cc.Button = null;

    // @property(BtnView)
    // btnView: BtnView = null;

    // @property(cc.Layout)
    layConfirmMain: cc.Layout = null;

    constructor() {
        super();
    }

    onLoad() {
        AudioManager.instance.playMusic("bgm_main")
        //ChatModule.instance.show();
        FuncUtil.delayFunc(function () {
            LoginModule.instance.hide()
        }, 1, this.node)
        this.diyiciStatNotice()
        MainController.instance.C_Activity_GetAvailableActivityList()
    }

    // start() {

    // }


    onDestroy() {
        super.destructor();
        this.node.stopAllActions()
    }

    updateLabelFunc(eventName: string, args1: string, args2: number) {

    }

    diyiciStatNotice() {            //第一次显示公告

        let todayDate = new Date();
        let playerMsg = GameManager.instance.getPlayerMsg()
        let wodrid = playerMsg.playerId
        let date = todayDate.getDate();
        let month = todayDate.getMonth() + 1;
        let year = todayDate.getFullYear();
        let dateweek = wodrid + "" + year + "" + month + "" + date + "";
        let Signed = cc.sys.localStorage.getItem("NOTICEADAY")
        if (dateweek != Signed) {
            cc.sys.localStorage.setItem("NOTICEADAY", dateweek)
            Notice.instance.show();
        }

    }
    changeDatFunc() {

    }

    btnCloseCallBack() {

    }

    btnMainCallBack() {

    }
}