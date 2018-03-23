
import { BaseModule } from "../../common/baseui/BaseModule";
import { LonghudouModel } from "./model/LonghudouModel";
import { LonghudouController } from "./controller/LonghudouController";
import LonghudouView from "./view/LonghudouView";
import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";
import { GameModule } from "../game/GameModule"
export class LonghudouModule extends BaseModule {
    

    initMVC() {
    }

    show() {
        LayerMgr.pushView("longhudouView", null, true, true);
        this.isShowing = true;
    }

    hide() {
        LayerMgr.popView("longhudouView", null, true);
        this.isShowing = false;

        this.view = null;
    }

    destructor() {
        super.destructor();
        LonghudouModule.instance = null;
    }

    public static instance: LonghudouModule = new LonghudouModule()
    
    private constructor() {
        super();
        this.model = LonghudouModel.instance
        this.controller = LonghudouController.instance
        this.view = new LonghudouView();
    }
}