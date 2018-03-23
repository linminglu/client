import BaseView from "../../../common/baseui/BaseView";
import { ChatModel as Model } from "../model/ChatModel";
import { ChatController as Ctr } from "../controller/ChatController";
import { ChatModule } from "../ChatModule";
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { FuncUtil } from "../../../common/util/FuncUtil";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig";
import { FactoryUtil } from "../../../common/util/FactoryUtil";
const { ccclass, property } = cc._decorator;
@ccclass
export default class ChatView extends BaseView {

    @property(cc.EditBox)
    txtEditBox: cc.EditBox = null;


    chattype: number = 1;       //处于哪个界面 
    Channeid: string = null;  //正在和谁对话

    onLoad() {
        this.node.getChildByName("nodeBg").on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        Emitter.register(EmitterCfg.CHAT_TOTAL, this.ReceiveExpression, this);
        Emitter.register(EmitterCfg.CHANNE_NAME, this.ChannenameFun, this);  //切换界面
    }
    
    onDestroy() {
        Emitter.unregister(EmitterCfg.CHAT_TOTAL, this.ReceiveExpression, this);

        Emitter.unregister(EmitterCfg.CHANNE_NAME, this.ChannenameFun, this);
    }
         
    //  表情转义字符
    ReceiveExpression(eventName: string, args1: string) {
        let strtxt = this.txtEditBox.string;
        strtxt += args1;
        this.txtEditBox.string = strtxt;
        this.node.getChildByName("sprphizBg").active = false;
    }
                                    //   界面       对方id
    ChannenameFun(eventName: string, args1: number, args2: string) {
        this.chattype=args1;
        this.Channeid=args2;
    }

    EditBoxdayin(data){
        //////////cc.log(11111)
        //////////cc.log(data)
    }
    
    btnSendoutFun() {
        if(this.txtEditBox.string!=""){
            let obg: any = {};
            if (this.Channeid == null) {
                obg = {
                    type: this.chattype,
                    content: this.txtEditBox.string,
                }
            }
            else {
                obg = {
                    type: this.chattype,
                    content: this.txtEditBox.string,
                    toPlayerId: this.Channeid
                }
            }
            Ctr.instance.C_Chat(obg)
            this.txtEditBox.string = "";
        }else{
            FactoryUtil.createAlertConfirmView("输入的内容为空!")
        }
        

    }
    btnPjizFun() {
        if (this.node.getChildByName("sprphizBg").active == false) {
            this.node.getChildByName("sprphizBg").active = true;
        }
        else {
            this.node.getChildByName("sprphizBg").active = false;
        }
    }
    btnCloseCallBack() {
        Emitter.fire(EmitterCfg.MAIN_PROMPT, "open","chat");
        ChatModule.instance.hide();
    }
}