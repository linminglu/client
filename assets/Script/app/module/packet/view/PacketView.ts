import BaseView from "../../../common/baseui/BaseView";
import { PacketModel } from "../model/PacketModel";
import { PacketController } from "../controller/PacketController";
import { PacketModule } from "../PacketModule";
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { MainController } from "../../main/controller/MainController";
import { GameManager } from "../../../../app/common/manager/GameManager";
import { TonghuashunModel } from "../../tonghuashun/model/TonghuashunModel";
import { GameController } from "../../game/controller/GameController"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"
import { FuncUtil } from "../../../common/util/FuncUtil"
import { LoginModule } from "../../login/LoginModule"
import { MainModule } from "../../main/MainModule"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"

const { ccclass, property } = cc._decorator;

@ccclass
export default class PacketView extends BaseView {



    onLoad() {

        PacketModel.instance.registerModelChanged("PACKET_RECEIVEMSG", this.monitordefault, this)
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        let receive = PacketModel.instance.getChioiceFun()
        //////////cc.log(receive)
        if (receive == 1) {
            this.receivecollarFun()
        } else if (receive == 2) {
            this.btnreceiveHairFun()
        } else {
            ////cc.log("------------------------")
            this.receivedefaultFun()
        }
        Emitter.register(EmitterCfg.GAME_EXIT_GAME, this.btnCloseCallBack, this)
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.Chonglian, this)
    }

    onDestroy() {
        PacketModel.instance.unregisterModelChanged("PACKET_RECEIVEMSG", this.monitordefault, this)
        Emitter.unregister(EmitterCfg.GAME_EXIT_GAME, this.btnCloseCallBack, this)
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.Chonglian, this)
    }

    Chonglian(){
        PacketModule.instance.hide();
    }

    monitordefault() {
        this.node.getChildByName("nodedefault").active = false;
    }

    //打开发红包
    btnreceiveHairFun() {
        let hairName = PacketModel.instance.getChioiceNameFun()
        if (hairName == "main") {
            this.node.getChildByName("nodehair").getComponent("Packethair").hairOneononeFun();
        } else if (hairName == "game") {
            this.node.getChildByName("nodehair").getComponent("Packethair").hairmanyPeopleFun();
        }
        this.node.getChildByName("nodedefault").active = false;
    }

    //打开红包
    receivecollarFun() {
        //this.dakaijiemianFun(false,true,false)
    }

    //红包主菜单
    receivedefaultFun() {
        let nodedefault = this.node.getChildByName("nodedefault")
        nodedefault.active = true;
        let hairName = PacketModel.instance.getChioiceNameFun()
        if (hairName == null) {
            nodedefault.getChildByName("btnfahonbao").active = false
        }
    }

    btnSwitchthemainmenu() {
        this.node.getChildByName("nodehair").getComponent("Packethair").hairOneononemanyPeoplefalse()
        this.node.getChildByName("nodedefault").active = true;
    }

    btnSwitchcollar() {
        this.node.getChildByName("nodecollar").getComponent("Packecollar").Closefalse()
        this.node.getChildByName("nodedefault").active = true;
    }

    btnCloseCallBack() {
        Emitter.fire(EmitterCfg.MAIN_PROMPT, "open", "packet");
        PacketModule.instance.hide();
    }



}