
import {BaseModule} from "../../common/baseui/BaseModule";
import { HelpModel } from "./model/HelpModel"
import { HelpController } from "./controller/HelpController"
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";
import HelpView from "./view/HelpView";
export class HelpModule extends BaseModule {

    show() {
        LayerMgr.pushView("helpView", null, true);
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("helpView", null, true);
        this.isShowing = false;
        this.view = null;
    }

    destructor() {
        super.destructor();

        HelpModule.instance = null;
    }

    public static instance : HelpModule = new HelpModule()

    private constructor() {
        super();

        this.model = HelpModel.instance
        this.controller = HelpController.instance
        this.view = new HelpView();
    }
}
