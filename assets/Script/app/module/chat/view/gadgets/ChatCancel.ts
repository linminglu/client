const { ccclass, property } = cc._decorator;
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig"
import { FriendController as Feieller } from "../../../friend/controller/FriendController"
import { PacketModel } from "../../../packet/model/PacketModel"
import { PacketModule } from "../../../packet/PacketModule"
@ccclass
export default class ChatCancel extends cc.Component {
    @property(cc.Node)
    canvas: cc.Node = null;
    @property(cc.Node)
    canvas1: cc.Node = null;
    @property(cc.Node)
    sprphiz: cc.Node = null;
    @property(cc.BoxCollider)
    collider: cc.BoxCollider = null;
    clickname: string = null;
    Channeid: string = null
    identity: string = "";

    channame = [];
    onLoad() {
        let self = this;
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch, event) => {
                let touchLoc = touch.getLocation();
                if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
                         self.node.getChildByName("click").active = false;
                         self.sprphiz.active = false;
                }
                return true;
            },
        }, this.node);

        Emitter.register(EmitterCfg.CHAT_CANCEL, this.clicktrueFun, this);  //私聊按钮
        Emitter.register(EmitterCfg.CHANNE_NAME, this.ChannenameFun, this);
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.CHAT_CANCEL, this.clicktrueFun, this);
        Emitter.unregister(EmitterCfg.CHANNE_NAME, this.ChannenameFun, this);
    }
    onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }
    //接收触摸坐标
    clicktrueFun(eventName: string, args1: string, args2: string, args3: any) {
        this.clickname = args1;
        this.Channeid = args2;
        if (args3.y < 170) {
            this.node.getChildByName("click").setAnchorPoint(0, 0);
        } else {
            this.node.getChildByName("click").setAnchorPoint(0, 1);
        }
        this.node.getChildByName("click").setPosition(args3);
        this.node.getChildByName("click").active = true;
    }
    //加好友
    btnjiaoyouFun() {
        let obg = {
            applyPlayerId: this.Channeid
        }
        Feieller.instance.C_AddFriend(obg)
    }
    //私聊
    btnsiliaoFun() {

        Emitter.fire(EmitterCfg.DIALOGUE_NAME, 2, this.clickname, this.Channeid);
        this.node.getChildByName("click").active = false;
    }

    ChannenameFun(eventName: string, args1: number) {
        if (args1 == 1) {
            this.canvas1.active = false
        }
        else {
            this.canvas1.active = true
        }
    }

    btnPacketCallBack() {

        PacketModel.instance.setChioiceFun(2, "mian")
        PacketModel.instance.setdepositPlayerdata(this.clickname, this.Channeid)
        PacketModule.instance.show()

    }
}
