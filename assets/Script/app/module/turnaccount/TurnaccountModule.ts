
import {BaseModule} from "../../common/baseui/BaseModule";
import { TurnaccountModel } from "./model/TurnaccountModel"
import { TurnaccountController } from "./controller/TurnaccountController"
import TurnaccountView from "./view/TurnaccountView"
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";
export class TurnaccountModule extends BaseModule {


 show() {
        //let view = LayerMgr.getNodeByName(this.viewName)
        //if (view != null) {
            //view.active = false
       // }else{
            LayerMgr.pushView("turnaccountView", null, true);
        //}

        
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("turnaccountView", null, true);
        //let view = LayerMgr.getNodeByName(this.viewName)
        //if (view != null) {
           // view.active = false
       // }
        this.isShowing = false;
        this.view = null;
    
    }


    public destructor() {
        super.destructor()

        TurnaccountModule.instance = null
    }
    
    public static instance: TurnaccountModule = new TurnaccountModule()

    private constructor() {
        super()
        
        this.model = TurnaccountModule.instance
        this.controller = TurnaccountController.instance
        this.view = new TurnaccountView()
    }
}
