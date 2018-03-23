import { BaseController } from "../../../common/baseui/BaseController";
import { SettingModel as Model } from "../model/SettingModel";
import { SettingModule } from "../SettingModule";

import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager";
import { TonghuashunModule } from "../../tonghuashun/TonghuashunModule"
import { LonghudouModule } from "../../longhudou/LonghudouModule"

export class SettingController extends BaseController {

    closeCallBackFun() {
        SettingModule.instance.hide()
    }
    exitCallBackFun() {
        let gameType = GameColMgr.instance.getGameTyp()
        if (gameType == 1) {
            TonghuashunModule.instance.hide()
        } else if (gameType == 2) {
            LonghudouModule.instance.hide()
        } else {
            if (cc.sys.isNative) {
                // cc.director.end();
            } else {

            }
        }
    }

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: SettingController = new SettingController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        SettingController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {
    }

    addEveRegister() {
    }

    delEveRegister() {
    }
}