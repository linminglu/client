
import { GameModule } from "../game/GameModule"
import { XiaojiuModel } from "./model/XiaojiuModel"
import { XiaojiuController } from "./controller/XiaojiuController"
import { LayerManager as LayerMgr } from "../../common/manager/LayerManager"
import { BaseModule } from "../../common/baseui/BaseModule";
import XiaojiuView from "./view/XiaojiuView"

export class XiaojiuModule extends BaseModule {


    initMVC() {
    }

    show() {
        LayerMgr.pushView("xiaojiuView", null, true, true);
        this.isShowing = true;
    }

    hide() {
        LayerMgr.popView("xiaojiuView", null, true);
        this.isShowing = false;

        this.view = null;
    }

    public destructor() {
        super.destructor()

        XiaojiuModule.instance = null
    }
    
    public static instance: XiaojiuModule = new XiaojiuModule()

    private constructor() {
        super()
        
        this.model = XiaojiuModel.instance
        this.controller = XiaojiuController.instance
        this.view = new XiaojiuView()
    }
}
