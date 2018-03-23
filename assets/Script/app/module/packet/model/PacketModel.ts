
import { BaseModel } from "../../../common/baseui/BaseModel"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../config/EmitterConfig"



export class PacketModel extends BaseModel {

    private getMailList=[]
        // senderName: null,//发送玩家名称
        // senderId: null,//发送人玩家ID
        // mailId: null,//邮件ID
        // mailContent: null,//邮件正文
        // mailTitle: null,//邮件内容
        // attachment: null,//邮件附件
        // availableTime: null//邮件有效时间
        // };
    private sendMail: number = null;
    // 0  主菜单  1 领  2 发
    private state: number = null;
    private stateName:string=null;
    private playerdata = { playerName: null, playerrId: null };

    setMailListmsg(msg) {
        this.getMailList = msg;
        //////////cc.log(msg)
        this.changedModel("PACKET_MAILLISTMSG", msg.mails)
    }

    setReceivemsg(msg) {
        this.getMailList = msg;
        //////////cc.log(msg)
        this.changedModel("PACKET_RECEIVEMSG", msg.mails)
    }

    getMailListmsg() {
        return this.getMailList;
    }

    setSendMailmsg(msg) {
         this.sendMail = msg.sendStatus;
         this.getMailList = msg.mails;
        this.changedModel("PACKET_SENDMAILMSG", msg.mails)
    }

    setChioiceFun(msg,name:string=null) {
        this.state = msg;
        this.stateName=name;
    }

    //红包详情
    setSMailCheckMail(msg){
        this.changedModel("PACKET_CHECKMAIL", msg)
    }

    getChioiceFun() {
        return this.state
    }

    getChioiceNameFun() {
        return this.stateName
    }


    setdepositPlayerdata(name, rid) {
        this.playerdata.playerName = name;
        this.playerdata.playerrId = rid;
    }
    
    //玩家信息
    getdepositPlayerdata() {
        return this.playerdata
    }

    destructor() {
        super.destructor();
        PacketModel.instance = null;
    }

    public static instance: PacketModel = new PacketModel()

    private constructor() {
        super();
    }
}