
import { BaseModule } from "../../common/baseui/BaseModule";
import { ChatModel } from "./model/ChatModel";
import { ChatController } from "./controller/ChatController";
import ChatView from "./view/ChatView";

import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";

export class ChatModule extends BaseModule {
    viewName = "chatView"

    initMVC() {
    }

    show() {
        let view = LayerMgr.getNodeByName(this.viewName)
        if (!cc.isValid(view)) {
            LayerMgr.pushView(this.viewName, null, null, null, 100);
        } else {
            view.active = true
        }
        this.isShowing = true;
    }
    hide() {
        let view = LayerMgr.getNodeByName(this.viewName)
        if (cc.isValid(view)) {
            view.active = false
        }

        this.isShowing = false;

        // this.view = null;
    }

    destructor() {
        super.destructor();
        ChatModule.instance = null;
    }

    public static instance: ChatModule = new ChatModule()

    private constructor() {
        super();

        this.model = ChatModel.instance;
        this.controller = ChatController.instance;
        this.view = new ChatView();
    }
}