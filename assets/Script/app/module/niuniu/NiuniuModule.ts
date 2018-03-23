
import { GameModule } from "../game/GameModule"
import { BaseModule } from "../../common/baseui/BaseModule";
import { NiuniuModel } from "./model/NiuniuModel"
import { NiuniuController } from "./controller/NiuniuController"
import NiuniuView from "./view/NiuniuView"
import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";
export class NiuniuModule extends BaseModule {



    initMVC() {
    }

    show() {
        LayerMgr.pushView("niuniuView", null, true, true);
        this.isShowing = true;
    }

    hide() {
        LayerMgr.popView("niuniuView", null, true);
        this.isShowing = false;

        this.view = null;
    }

    public destructor() {
        super.destructor()

        NiuniuModule.instance = null
    }
    
    public static instance: NiuniuModule = new NiuniuModule()

    private constructor() {
        super()
        
        this.model = NiuniuModel.instance
        this.controller = NiuniuController.instance
        this.view = new NiuniuView()
    }
}
