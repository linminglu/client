
import {BaseModule} from "../../common/baseui/BaseModule"
import {SettingModel} from "./model/SettingModel"
import {SettingController} from "./controller/SettingController"
import  SettingView from "./view/SettingView"
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager"
import { ResConfig as ResCfg } from "../../common/util/ResConfig"
import { GameCollectManager as GameColMgr } from "../../common/manager/GameCollectManager"

export class SettingModule extends BaseModule {
    protected gameTag: string = null

    show(gameTag: string = null) {
        super.show()

        if (gameTag == null) {
            this.gameTag = GameColMgr.instance.getGameTag()
        } else {
            this.gameTag = gameTag
        }

        LayerMgr.pushView(`settingView_${this.gameTag}`, null)
        this.isShowing = true
    }
    
    hide() {
        super.hide()

        LayerMgr.popView(`settingView_${this.gameTag}`, null)
        this.isShowing = false
        this.view = null
    }
    
    destructor() {
        super.destructor()

        SettingModule.instance = null
    }

    public static instance : SettingModule = new SettingModule()

    private constructor() {
        super()

        this.model = SettingModel.instance
        // this.controller = SettingController.instance
        this.view = new SettingView()
    }
}