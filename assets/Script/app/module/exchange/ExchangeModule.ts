
import { BaseModule } from "../../common/baseui/BaseModule";
import { ExchangeModel } from "./model/ExchangeModel";
import { ExchangeController } from "./controller/ExchangeController";
import ExchangeView from "./view/ExchangeView";

import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";

export class ExchangeModule extends BaseModule {
    protected gameTag: string = null
    protected gameViewName: string = null

    show() {
        LayerMgr.pushView("exchangeView", null, true);
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("exchangeView", null, true);
        this.isShowing = false;
        
        
        this.view = null;
    }

    destructor() {
        super.destructor();

        ExchangeModule.instance = null;
    }

    public static instance : ExchangeModule = new ExchangeModule()

    private constructor() {
        super();

        this.model = ExchangeModel.instance;
        this.controller = ExchangeController.instance;
        this.view = new ExchangeView();
    }
}