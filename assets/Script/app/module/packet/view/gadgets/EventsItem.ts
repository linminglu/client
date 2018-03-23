const {ccclass, property} = cc._decorator;
import { PacketController } from "../../controller/PacketController";
@ccclass
export default class EventsItem extends cc.Component {

    eventstype=["","已领取","已过期"]
    eventsId=null;
    eventsType=0;
    onLoad() {
        // init logic
        
    }
    onDestroy() {
        
    }
    eventsItemFun(data){
        this.eventsId=data.mailId
        if(data.mailBoxId>0){
            this.eventsType=1
        }
        
        let lblwho=this.node.getChildByName("lblWho").getComponent(cc.Label)
        let lblstate=this.node.getChildByName("lblstate").getComponent(cc.Label)
        lblwho.string=data.senderName+"发来的红包";
        if(data.mailStatus>0){
            this.node.getChildByName("btnReceive").active=false;
        }
        lblstate.string=this.eventstype[data.mailStatus];
    }

    btnReceiveFun(){
        PacketController.instance.C_Mail_FetchMail({mailId:this.eventsId,mailType:this.eventsType})
    }
}
