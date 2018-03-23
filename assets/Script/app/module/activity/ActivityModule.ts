
import {BaseModule} from "../../common/baseui/BaseModule";
import {ActivityModel} from "./model/ActivityModel";
import {ActivityController} from "./controller/ActivityController";
import  ActivityView from "./view/ActivityView";
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";
export class ActivityModule extends BaseModule {
    initMVC() {
    }
    
    show() {
        LayerMgr.pushView("activityView", null, true);
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("activityView", null, true);
        this.isShowing = false;
        this.view = null;
    }

    destructor() {
        super.destructor();

        ActivityModule.instance = null;
    }

    public static instance : ActivityModule = new ActivityModule()

    private constructor() {
        super();

        this.model = ActivityModel.instance;
        this.controller = ActivityController.instance;
        this.view = new ActivityView();
    }
}