import { MainModule } from "../../MainModule";
import { LoginModule } from "../../../login/LoginModule";
import { ChatModule } from "../../../chat/ChatModule"
import { Express } from "../../../../../GameConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig";
import { PacketModel } from "../../../packet/model/PacketModel"
import { PacketController } from "../../../packet/controller/PacketController"
import { PacketModule } from "../../../packet/PacketModule"
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainNodeBottom extends cc.Component {

    @property(cc.Button)
    btnChat: cc.Button = null;

    @property(cc.Button)
    btnVoice: cc.Button = null;

    @property(cc.Node)
    Dialogue: cc.Node = null;


    onLoad() {
        Emitter.register(EmitterCfg.CHAT_DIALOGUE, this.Getavatarname, this);
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.CHAT_DIALOGUE, this.Getavatarname, this);
    }
    Getavatarname(eventName: string, args1: any) {
        if (args1.type == 1) {
            this.Dialogue.getChildByName("lblname").getComponent(cc.Label).string = args1.sendPlayerName + "：";
            this.Dialogue.getChildByName("lblname").getComponent(cc.Label).node.color = new cc.Color(50, 100, 255);
            var strdata = args1.content;
            for (let i = 0; i < Express.length; i++) {
                if (strdata.indexOf(Express[i].unbind) > -1) {
                    strdata = strdata.replace(Express[i].unbind, Express[i].meaning)
                    i = 0;
                }
            }
            this.Dialogue.getChildByName("lblword").getComponent(cc.RichText).string = strdata;
        }
    }

    btnChatCallBack() {

        Emitter.fire(EmitterCfg.MAIN_PROMPT, "close", "chat");
        ChatModule.instance.show();
    }

    btnVoiceCallBack() {

    }

    btnPacketCallBack() {
        Emitter.fire(EmitterCfg.MAIN_PROMPT, "close", "packet");
        PacketModel.instance.setChioiceFun(0)
        PacketModule.instance.show()
        
    }


}
