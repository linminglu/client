const { ccclass, property } = cc._decorator;
import { PacketModel } from "../../model/PacketModel";
import { PacketModule } from "../../PacketModule";
import { PacketController } from "../../controller/PacketController";
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
@ccclass
export default class Packecollar extends cc.Component {

    sendId:number=null
    mailBoxId:number=null

    @property(cc.ScrollView)                    //滑动视图
    detailsScroll: cc.ScrollView = null;
    onLoad() {
        // init logic
        PacketModel.instance.registerModelChanged("PACKET_RECEIVEMSG", this.typeofredenvelopes, this)
        PacketModel.instance.registerModelChanged("PACKET_CHECKMAIL", this.MonitorViewTheDetails, this)
    }

    onDestroy() {
        PacketModel.instance.unregisterModelChanged("PACKET_RECEIVEMSG", this.typeofredenvelopes, this)
        PacketModel.instance.unregisterModelChanged("PACKET_CHECKMAIL", this.MonitorViewTheDetails, this)
    }


    typeofredenvelopes(eventName: string, listmsg) {
        if(listmsg.mailBoxId<=0){
            this.node.getChildByName("nodecollar").active = true;
          
            this.receivecollarFun(listmsg)
        }else if(listmsg.mailBoxId>0){
            if(listmsg.attachment.length==0){
                this.sendId=listmsg.senderId
                this.mailBoxId=listmsg.mailBoxId
                this.btnViewTheDetails()
                return
            }
            this.node.getChildByName("noderob").active = true;
            this.receiverobFun(listmsg)
           
        }
       
    }

    MonitorViewTheDetails(eventName: string, listmsg){
        this.Closefalse()
        this.node.getChildByName("nodedetails").active = true
        this.ViewTheDetailsFun(listmsg)
    }

    Closefalse() {
        this.node.getChildByName("nodecollar").active = false
        this.node.getChildByName("noderob").active = false
        this.node.getChildByName("nodedetails").active = false
    }
    // 领
    receivecollarFun(data) {
        //////////cc.log(data.senderName)
        //////////cc.log(data.mailTitle)
        let nodecollar = this.node.getChildByName("nodecollar")
        let Title = data.mailTitle;
        let playerName = data.senderName;
        let gold = data.attachment[0].value / 100;
        let lblBg = nodecollar.getChildByName("lblBg").getComponent(cc.Label)
        let lbldata = nodecollar.getChildByName("lbldata").getComponent(cc.Label)
        let rlblgold = nodecollar.getChildByName("rlblgold").getComponent(cc.RichText)
        lblBg.string = Title + "";
        playerName = "好友" + playerName;
        lbldata.string = "恭喜你获得" + playerName + "发来的红包";
        rlblgold.string = "<color=#FFFFFF>" + gold + "</c><color=#FBD51C><size=20>元</color>";
    }

    // 抢
    receiverobFun(data){
        this.sendId=data.senderId
        this.mailBoxId=data.mailBoxId
        let nodecollar = this.node.getChildByName("noderob")
        let Title = data.mailTitle;
        let playerName = data.senderName;
        let gold = data.attachment[0].value / 100;
        let lblBg = nodecollar.getChildByName("lblBg").getComponent(cc.Label)
        let lbldata = nodecollar.getChildByName("lbldata").getComponent(cc.Label)
        lblBg.string = Title + "";
        lbldata.string = "你抢到了" + playerName + "发来的红包"+gold+"元";
    }

    // 查
    ViewTheDetailsFun(listmsg){
        let nodecollar = this.node.getChildByName("nodedetails")
        let lblLuck = nodecollar.getChildByName("lblLuck").getComponent(cc.Label)
        let lblSurplus = nodecollar.getChildByName("lblSurplus").getComponent(cc.Label)
        let lblbalance = nodecollar.getChildByName("lblbalance").getComponent(cc.Label)
        let mails=listmsg.mails
        let Maximum=mails[0]
        for(let i = 0; i < mails.length; i++){
            if(Maximum.value<mails[i].value){
                Maximum=mails[i]
            }
        }
        lblLuck.string=Maximum.key+"是人气王";
        let valuenbr=listmsg.attachment[0].value/100
        lblSurplus.string=valuenbr+"";
        lblbalance.string=listmsg.leftMailCount+"";
        this.detailsScroll.content.removeAllChildren(false);
        ResCfg.loadPrefab(this, "events1Item", function (self, prefab) {
            for (let i = 0; i < mails.length; i++) {
                let packeitem = cc.instantiate(prefab);
                self.detailsScroll.content.addChild(packeitem);
                packeitem.getComponent("EventstoItem").eventstoItemFun(mails[i])
                if(mails[i]==Maximum){
                packeitem.getComponent("EventstoItem").KingOfPopularity()   
                }
            }
        }, null, true)
    }

    //查看详情
    btnViewTheDetails(){
        PacketController.instance.C_Mail_CheckMail({sendId:this.sendId,mailBoxId:this.mailBoxId})
    }

    btnCloseCallBack() {
        PacketModule.instance.hide();
    }
}
