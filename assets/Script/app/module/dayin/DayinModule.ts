
import { BaseModule } from "../../common/baseui/BaseModule";
import { DayinModel } from "./model/DayinModel";
import { DayinController } from "./controller/DayinController";
import DayinScrollView from "./view/DayinScrollView";

import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";

export class DayinModule extends BaseModule {
    initMVC() {
    }

    show() {
        LayerMgr.pushView("dayinScrollView", null, true);
        this.isShowing = true;
    }

    hide() {
        LayerMgr.popView("dayinScrollView", null, true);
        this.isShowing = false;

        this.view = null;
    }

    destructor() {
        super.destructor();
        DayinModule.instance = null;
    }

    public static instance: DayinModule = new DayinModule()

    private constructor() {
        super();

        this.model = DayinModel.instance
        this.controller = DayinController.instance
        this.view = new DayinScrollView();
    }
}