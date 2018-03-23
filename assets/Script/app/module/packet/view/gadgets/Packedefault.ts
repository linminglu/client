import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { PacketModel } from "../../model/PacketModel";
import { PacketController } from "../../controller/PacketController";
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator;

@ccclass
export default class Packedefault extends cc.Component {

    @property(cc.Node)
    sprOrange: cc.Node[] = [];

    @property(cc.ScrollView)                    //滑动视图
    Allevents: cc.ScrollView = null;
    type: number = null;
    refresh: number = -1;
    onLoad() {
        let self = this
        self.Allevents.node.on("bounce-bottom", function () {
            PacketController.instance.C_Mail_GetMailList({
                mailListType: self.type,
                mailIndex: self.refresh
            })
        })
        PacketModel.instance.registerModelChanged("PACKET_MAILLISTMSG", this.monitorpacke, this)
        PacketModel.instance.registerModelChanged("PACKET_SENDMAILMSG", this.monitorsetSendMail, this)
    }

    onDestroy() {
        PacketModel.instance.unregisterModelChanged("PACKET_MAILLISTMSG", this.monitorpacke, this)
        PacketModel.instance.unregisterModelChanged("PACKET_SENDMAILMSG", this.monitorsetSendMail, this)
    }

    onEnable() {
        this.btnweilingquFun()
    }

    onDisable() {

    }
    //单个
    monitorsetSendMail(eventName: string, listmsg) {
        ResCfg.loadPrefab(this, "eventsItem", function (self, prefab) {
            let packeitem = cc.instantiate(prefab);
            //////////cc.log(packeitem)
            self.Allevents.content.addChild(packeitem);
            packeitem.getComponent("EventsItem").eventsItemFun(listmsg)
        }, null, true)
    }
    //多个
    monitorpacke(eventName: string, listmsg) {

        ResCfg.loadPrefab(this, "eventsItem", function (self, prefab) {
            for (let i = 0; i < listmsg.length; i++) {
                FuncUtil.delayFunc(function () {
                    let packeitem = cc.instantiate(prefab);
                    //////////cc.log(packeitem)
                    self.Allevents.content.addChild(packeitem);
                    packeitem.getComponent("EventsItem").eventsItemFun(listmsg[i])
                }, 0.02 * i, self.node)
            }
            let listmsgs=listmsg[listmsg.length - 1]
            if(listmsgs){
                self.refresh = listmsgs.mailId
            }
        }, null, true)
    }


    btnweilingquFun() {
        this.switchingInterfaceFun(0)
        PacketController.instance.C_Mail_GetMailList({ mailListType: 0, mailIndex: -1 })
    }

    btnyilingquFun() {
        this.switchingInterfaceFun(1)
        PacketController.instance.C_Mail_GetMailList({ mailListType: 1, mailIndex: -1 })
    }

    btnyiguoqiFun() {
        this.switchingInterfaceFun(2)
        PacketController.instance.C_Mail_GetMailList({ mailListType: 2, mailIndex: -1 })
    }

    btnquangbuFun() {
        this.switchingInterfaceFun(3)
        PacketController.instance.C_Mail_GetMailList({ mailListType: 100, mailIndex: -1 })
    }

    switchingInterfaceFun(value) {
        this.type = value;
        if(value==3)this.type=100
        this.Allevents.content.removeAllChildren(false);
        for (let i = 0; i < this.sprOrange.length; i++) {
            this.sprOrange[i].active = false;
            if (i == value) {
                this.sprOrange[i].active = true;
            }
        }
    }


}
