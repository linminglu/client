import { BaseController } from "../../../common/baseui/BaseController";
import { ChatModel as Model } from "../model/ChatModel";
import { ChatModule } from "../ChatModule";
import { MainModule } from "../../main/MainModule";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
export class ChatController extends BaseController {

    public EndStorage:boolean=true;
    //接受消息
    S_Chat(msg) {   

        Emitter.fire(EmitterCfg.MAIN_PROMPT, null,"chat");
        Emitter.fire(EmitterCfg.CHAT_DIALOGUE, msg);
        //////////cc.log(msg)
        if(this.EndStorage){
            Model.instance.setStoreMessages(msg);//未打开时储存聊天记录
        }
    }
    //发送消息
    C_Chat(param) {
        let msgName = "C_Chat"
        let msgData = param
        this.netWorkMgr.sendData(msgName, msgData);
    }
    ChatFunc() {

    }

    confirmChatFunc(accountStr: string, passwordStr: string) {


    }
    public static instance: ChatController = new ChatController()
    
    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        ChatController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {
        this.netWorkMgr.register("S_Chat", this.S_Chat, this);
    }

    addEveRegister() {
    }

    delEveRegister() {
    }
    
}