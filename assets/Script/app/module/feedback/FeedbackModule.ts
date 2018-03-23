
import {BaseModule} from "../../common/baseui/BaseModule";
import {FeedbackModel} from "./model/FeedbackModel";
import {FeedbackController} from "./controller/FeedbackController";
import  FeedbackView from "./view/FeedbackView";
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";
export class FeedbackModule extends BaseModule {
    initMVC() {
    }
    
    show() {
        LayerMgr.pushView("feedbackView", null, true);
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("feedbackView", null, true);
        this.isShowing = false;
        this.view = null;
    }

    destructor() {
        super.destructor();

        FeedbackModule.instance = null;
    }

    public static instance : FeedbackModule = new FeedbackModule()

    private constructor() {
        super();

        this.model = FeedbackModel.instance
        this.controller = FeedbackController.instance
        this.view = new FeedbackView();
    }
}