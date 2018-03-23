
import { BaseModule } from "../../common/baseui/BaseModule";
import { TonghuashunModel } from "./model/TonghuashunModel";
import { TonghuashunController } from "./controller/TonghuashunController";
import TonghuashunView from "./view/TonghuashunView";

import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";

export class TonghuashunModule extends BaseModule {
    initMVC() {
    }

    show() {
        LayerMgr.pushView("tonghuashunView", null, true, true);
        this.isShowing = true;
    }

    hide() {
        LayerMgr.popView("tonghuashunView", null, true);
        this.isShowing = false;

        this.view = null;
    }

    destructor() {
        super.destructor();
        TonghuashunModule.instance = null;
    }

    public static instance: TonghuashunModule = new TonghuashunModule()

    private constructor() {
        super();

        this.model = TonghuashunModel.instance
        this.controller = TonghuashunController.instance
        this.view = new TonghuashunView();
    }
}