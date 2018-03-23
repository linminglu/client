
import { BaseModule } from "../../common/baseui/BaseModule";
import { MainModel } from "./model/MainModel";
import { MainController } from "./controller/MainController";
import MainView from "./view/MainView";
import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";

export class MainModule extends BaseModule {
    isShowing = false
    show() {
        if (!this.isShowing) {
            // super.show()
            
            LayerMgr.pushView("mainView", null, true);
            this.isShowing = true
        }
    }

    hide() {
        if (this.isShowing) {
            // super.hide()

            LayerMgr.popView("mainView", null, true);
            this.view = null;
            this.isShowing = false
        }
    }

    destructor() {
        super.destructor();

        MainModule.instance = null;
    }

    public static instance: MainModule = new MainModule()

    private constructor() {
        super();

        this.model = MainModel.instance
        this.controller = MainController.instance
        this.view = new MainView();
    }
}