const { ccclass, property } = cc._decorator;
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { Express } from "../../../../../GameConfig"
@ccclass
export default class DialogueItem extends cc.Component {
    //  单人对话信息  
    onLoad() {
        Emitter.register(EmitterCfg.CHAT_NUMBER, this.mylocationFun, this);
    }
    onDestroy() {
        Emitter.unregister(EmitterCfg.CHAT_NUMBER, this.mylocationFun, this);
    }
    Dialoguename: string = "";
    Channeid: number = null;
    place: number = 20;

    //就说 消息内容
    DialogueItemFun(data) {
        this.Dialoguename = data.sendPlayerName;
        this.Channeid = data.sendPlayerId;

        let playerMsg = GameManager.instance.getPlayerMsg()
        if (playerMsg.playerId != this.Channeid) {
            this.node.getChildByName("lblname").getComponent(cc.Label).string = data.sendPlayerName + "：";
            this.node.getChildByName("lblname").getComponent(cc.Label).node.color = new cc.Color(0, 255, 0);
        }
        else {
            this.node.getChildByName("lblname").getComponent(cc.Label).string = "你说：";
            this.node.getChildByName("lblname").getComponent(cc.Label).node.color = new cc.Color(50, 100, 255);
        }

        var strdata = data.content;
        for (let i = 0; i < Express.length; i++) {
            if (strdata.indexOf(Express[i].unbind) > -1) {
                strdata=strdata.replace(Express[i].unbind, Express[i].meaning)
                i = 0;
            }
        }

        this.node.getChildByName("lblword").getComponent(cc.RichText).string = strdata;
        if (data.type == 2) {
            cc.find("lblname/btnclick", this.node).getComponent(cc.Button).interactable = false;
        }
    }
    
    //发送私聊世界坐标
    btnclickFun() {
        cc.log("11111111111")
        let playerMsg = GameManager.instance.getPlayerMsg()
        if (playerMsg.playerId != this.Channeid) {
            let shijie = cc.find('lblname/click', this.node).convertToWorldSpaceAR(cc.v2(0, 0))  //世界坐标
            Emitter.fire(EmitterCfg.CHAT_CANCEL, this.Dialoguename, this.Channeid, shijie);
        }
    }

    mylocationFun(eventName: string) {
        this.place--;
        if (this.place == 0) {
            this.node.removeFromParent();
        }
    }

}
