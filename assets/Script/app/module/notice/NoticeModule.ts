
import {BaseModule} from "../../common/baseui/BaseModule";
import {NoticeModel} from "./model/NoticeModel";
import {NoticeController} from "./controller/NoticeController";
import  NoticeView from "./view/NoticeView";
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";

export class NoticeModule extends BaseModule {
    initMVC() {
    }
    
    show() {
        LayerMgr.pushView("noticeView", null, true);
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("noticeView", null, true);
        
        this.isShowing = false;
        this.view = null;
    }

    destructor() {
        super.destructor();
        NoticeModule.instance = null;
    }

    public static instance : NoticeModule = new NoticeModule()

    private constructor() {
        super();

        this.model = NoticeModel.instance
        this.controller = NoticeController.instance
        this.view = new NoticeView();
    }
}