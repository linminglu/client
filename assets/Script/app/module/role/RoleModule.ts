
import {BaseModule} from "../../common/baseui/BaseModule";
import {RoleModel} from "./model/RoleModel";
import {RoleController} from "./controller/RoleController";
import  RoleView from "./view/RoleView";

import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";

export class RoleModule extends BaseModule {
    initMVC() {
    }
    
    show() {
        LayerMgr.pushView("roleView", null, true);
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("roleView", null, true);
        this.isShowing = false;
        
        this.view = null;
    }

    destructor() {
        super.destructor();

        RoleModule.instance = null;
    }

    public static instance : RoleModule = new RoleModule()

    private constructor() {
        super();

        this.model = RoleModel.instance
        this.controller = RoleController.instance
        this.view = new RoleView();
    }
}