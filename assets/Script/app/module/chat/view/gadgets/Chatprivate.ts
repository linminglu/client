const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig"
import { GameManager } from "../../../../common/manager/GameManager"
@ccclass
export default class Chatprivate extends cc.Component {

    //创建私聊
    channame = [];
    onLoad() {
        Emitter.register(EmitterCfg.DIALOGUE_NAME, this.ChannenameFun, this);   

        Emitter.register(EmitterCfg.CHAT_DELETE, this.daleteFun, this);    //删除

        Emitter.register(EmitterCfg.CHAT_DIALOGUE, this.Getavatarname, this);   //私聊服务器

    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.DIALOGUE_NAME, this.ChannenameFun, this);

        Emitter.unregister(EmitterCfg.CHAT_DELETE, this.daleteFun, this);

        Emitter.unregister(EmitterCfg.CHAT_DIALOGUE, this.Getavatarname, this);
    }

    
    //接受服务器消息
    Getavatarname(eventName: string, args1: any) {
        let playerMsg = GameManager.instance.getPlayerMsg()
        if (this.channame.indexOf(args1.sendPlayerId) == -1 && playerMsg.playerId == args1.toPlayerId) {
            this.FoundPrivateFun(args1.type, args1.sendPlayerName, args1.sendPlayerId);
            setTimeout(function () {
                Emitter.fire(EmitterCfg.CHAT_DIALOGUE, args1);
            }.bind(this), 200)
        }

    }
    //删除私聊
    daleteFun(eventName: string, args1: string) {
        for (let i = 0; i < this.channame.length; i++) {
            if (this.channame[i] == args1) {
                this.channame[i] = this.channame[this.channame.length - 1]
                break;
            }
        }
        this.channame.pop();
    }

    //创建界面 
    FoundPrivateFun(type, name, rid) {
        this.channame.push(rid);
        ResCfg.loadPrefab(this, "channelitem", function (self, prefab) {
            let curView = cc.instantiate(prefab);
            self.node.getChildByName("nodeChatMan").addChild(curView);
            curView.getComponent("Channelitem").ChannelitemFun(type, name, rid);
        })
        ResCfg.loadPrefab(this, "InterfaceItem", function (self, prefab) {
            let curView = cc.instantiate(prefab);
            self.node.getChildByName("nodeInterface").addChild(curView);//nodeInterface
            curView.getComponent("InterfaceItem").InterfaceItemFun(type, name, rid);
            Emitter.fire(EmitterCfg.CHANNE_NAME, rid);
        })
       
    }

    //验证是否已创建该私聊
    ChannenameFun(eventName: string, args1: number, args2: string, args3: string) {
        for (var i = 0; i < this.channame.length; i++) {
            if (this.channame[i] == args3) {
                Emitter.fire(EmitterCfg.CHANNE_NAME, args3);
                return
            }
        }
        if (i == this.channame.length) {
            this.FoundPrivateFun(args1, args2, args3)
           
        }

    }
}
