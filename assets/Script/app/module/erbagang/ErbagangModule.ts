
import { BaseModule } from "../../common/baseui/BaseModule";
import { ErbagangModel } from "./model/ErbagangModel";
import { ErbagangController } from "./controller/ErbagangController";
import ErbagangView from "./view/ErbagangView";

import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";

export class ErbagangModule extends BaseModule {
    initMVC() {
    }

    show() {
        LayerMgr.pushView("erbagangView", null, true, true);
        this.isShowing = true;
    }

    hide() {
        LayerMgr.popView("erbagangView", null, true);
        this.isShowing = false;

        this.view = null;
    }

    destructor() {
        super.destructor();
        ErbagangModule.instance = null;
    }

    public static instance: ErbagangModule = new ErbagangModule()

    private constructor() {
        super();

        this.model = ErbagangModel.instance
        this.controller = ErbagangController.instance
        this.view = new ErbagangView();
    }
}