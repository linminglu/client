
import {BaseModule} from "../../common/baseui/BaseModule";
import {FriendModel} from "./model/FriendModel";
import {FriendController} from "./controller/FriendController";
import  FriendView from "./view/FriendView";
import { ResConfig as ResCfg } from "../../common/util/ResConfig"
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager";

export class FriendModule extends BaseModule {
    initMVC() {
    }
    
    show() {
        LayerMgr.pushView("friendsListView", null, true);
        this.isShowing = true;
    }
    
    hide() {
        LayerMgr.popView("friendsListView", null, true);
        this.isShowing = false;
        this.view = null;
    }

    destructor() {
        super.destructor();

        FriendModule.instance = null;
    }

    public static instance : FriendModule = new FriendModule()

    private constructor() {
        super();

        this.model = FriendModel.instance
        this.controller = FriendController.instance
        this.view = new FriendView();
    }
}