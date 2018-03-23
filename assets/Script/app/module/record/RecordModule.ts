
import { BaseModule } from "../../common/baseui/BaseModule";
import { RecordModel } from "../record/model/RecordModel"
import { RecordController } from "./controller/RecordController"
import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";
import { GameCollectManager as GameColMgr } from "../../common/manager/GameCollectManager"
import RecordView from "./view/RecordView"

export class RecordModule extends BaseModule {

    public viewName: string = "recordView"

    show() {
        if (!this.isShowing) {
            LayerMgr.pushView("recordView", null, true);
            this.isShowing = true;
        }
    }

    hide() {
        if (this.isShowing) {
            LayerMgr.popView("recordView", null, true);
            this.isShowing = false;
            this.view = null;
        }
    }
    public destructor() {
        super.destructor()

        RecordModule.instance = null
    }

    public static instance: RecordModule = new RecordModule()

    private constructor() {
        super()

        this.model = RecordModule.instance
        this.controller = RecordController.instance
        this.view = new RecordView()
    }
}
