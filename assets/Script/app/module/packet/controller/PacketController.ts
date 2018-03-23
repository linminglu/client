import { BaseController } from "../../../common/baseui/BaseController";
import { PacketModel as Model } from "../model/PacketModel";
import { PacketModule } from "../PacketModule";

import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager";
import { TonghuashunModule } from "../../tonghuashun/TonghuashunModule"
import { LonghudouModule } from "../../longhudou/LonghudouModule"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig";

export class PacketController extends BaseController {

    C_Mail_GetMailList (param)//获取红包邮件列表请求
    {
        let msgName = "C_Mail_GetMailList";
        let msgData = param
        this.sendData(msgName,msgData);
    }

    S_Mail_GetMailList (msg)//红包邮件列表推送
    {
        //////////cc.log(msg)
        Model.instance.setMailListmsg(msg)
    }
	
    C_Mail_FetchMail (param)//领取红包邮件内容请求
    {
        let msgName = "C_Mail_FetchMail";
        let msgData = param
       
        this.sendData(msgName, msgData);
    }

    S_Mail_FetchMail (msg)//领取红包邮件内容请求结果
    {
        //////////cc.log(msg)
        Model.instance.setReceivemsg(msg)
    }
	
    C_Mail_SendMail (param)//发送红包请求
    {
        let msgName = "C_Mail_SendMail";
        let msgData =param
        this.sendData(msgName, msgData);
    }

    S_Mail_SendMail (msg)//发送红包请求结果
    {
        //////////cc.log(msg)
        if(msg.sendStatus==2){
            Emitter.fire(EmitterCfg.MAIN_PROMPT, null,"packet");
        }
        Model.instance.setSendMailmsg(msg)
    }

    C_Mail_CheckMail (param) //查看红包详情
    {
        let msgName = "C_Mail_CheckMail";
        let msgData =param
        this.sendData(msgName, msgData);
    }

    S_Mail_CheckMail (msg)   //查看红包详情
    {
        Model.instance.setSMailCheckMail(msg)
    }
    
    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: PacketController = new PacketController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        PacketController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {
        this.register("S_Mail_GetMailList", this.S_Mail_GetMailList, this);
        this.register("S_Mail_FetchMail", this.S_Mail_FetchMail, this);
        this.register("S_Mail_SendMail", this.S_Mail_SendMail, this);
        this.register("S_Mail_CheckMail", this.S_Mail_CheckMail, this);
       
    }

    addEveRegister() {
    }

    delEveRegister() {
    }
}