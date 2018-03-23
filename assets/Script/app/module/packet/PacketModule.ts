
import {BaseModule} from "../../common/baseui/BaseModule"
import {PacketModel} from "./model/PacketModel"
import {PacketController} from "./controller/PacketController"
import  PacketView from "./view/PacketView"
import {LayerManager as LayerMgr} from "../../common/manager/LayerManager"

import { GameCollectManager as GameColMgr } from "../../common/manager/GameCollectManager"

export class PacketModule extends BaseModule {
    protected gameTag: string = null;
    protected viewName: string = "packetView";

    show() {
        LayerMgr.pushView("packetView", null, null,null,110);
        this.isShowing = true;
    }

    hide() {
        LayerMgr.popView("packetView", null, null);
        this.isShowing = false;

        this.view = null;
    }
    
    destructor() {
        super.destructor()

        PacketModule.instance = null
    }

    public static instance : PacketModule = new PacketModule()

    private constructor() {
        super()

        this.model = PacketModel.instance
        // this.controller = PacketController.instance
        this.view = new PacketView()
    }
}