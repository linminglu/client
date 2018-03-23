
import { BaseModule } from "../../common/baseui/BaseModule";
import { ZhajinhuaModel } from "./model/ZhajinhuaModel";
import { ZhajinhuaController } from "./controller/ZhajinhuaController";
import ZhajinhuaView from "./view/ZhajinhuaView";

import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";

export class ZhajinhuaModule extends BaseModule {
    initMVC() {
    }

    show() {
        if (!this.isShowing) {
            LayerMgr.pushView("zhajinhuaView", null, true, true);
            this.isShowing = true;
        }
    }

    hide() {
        if (this.isShowing) {
            LayerMgr.popView("zhajinhuaView", null, true);
            this.isShowing = false;

            this.view = null;
        }
    }

    destructor() {
        super.destructor();
        ZhajinhuaModule.instance = null;
    }

    public static instance: ZhajinhuaModule = new ZhajinhuaModule()

    private constructor() {
        super();

        this.model = ZhajinhuaModel.instance
        this.controller = ZhajinhuaController.instance
        this.view = new ZhajinhuaView();
    }
}