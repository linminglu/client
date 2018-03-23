
import {BaseModule} from "../../common/baseui/BaseModule";
import {SignModel} from "./model/SignModel";
import {SignController} from "./controller/SignController";
import  SignView from "./view/SignView";

import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";

export class SignModule extends BaseModule {
    initMVC() {
    }
    
    show() {
        LayerMgr.pushView("signView", null, true);
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("signView", null, true);
        this.isShowing = false;
        this.view = null;
    }

    destructor() {
        super.destructor();
        SignModule.instance = null;
    }

    public static instance : SignModule = new SignModule()

    private constructor() {
        super();

        this.model = SignModel.instance
        this.controller = SignController.instance
        this.view = new SignView();
    }
}