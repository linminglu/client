const { ccclass, property } = cc._decorator;
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig"
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
@ccclass
export default class Channelitem extends cc.Component {
    //切换界面
    Channetype: number = 1;
    Channename: string = "大厅";
    Channeid: string = null;
    onLoad() {
        Emitter.register(EmitterCfg.CHANNE_NAME, this.ChannenameFun, this);//监听自己
        if(this.node.name=="nodeHallroom"){
            this.Channename="大厅";
            this.Channetype=1;
            this.Channeid = null;
        }else if(this.node.name=="nodeGameroom"){
            this.Channename="游戏房间";
            this.Channetype=3;
            this.Channeid = null;
        }
        this.btnChannenameFun();
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.CHANNE_NAME, this.ChannenameFun, this);
    }

  
    //储存值
    ChannelitemFun(type, name, rid) {
        this.Channetype = type;
        this.Channename = name;
        this.Channeid = rid;
        this.node.getChildByName("lblchanne").getComponent(cc.Label).string = name
        this.node.getChildByName("sprliangBg").active = true;
        this.btnChannenameFun();
    }

    //切换界面
    btnChannenameFun() {
        let gameTag = GameColMgr.instance.getGameTag()
        if (gameTag == null&&this.Channename=="游戏房间") return
        Emitter.fire(EmitterCfg.CHANNE_NAME, this.Channetype, this.Channeid);
    }

    //删除
    btnerrandFun(){                                          
        Emitter.fire(EmitterCfg.CHANNE_NAME, 1, null);
        Emitter.fire(EmitterCfg.CHAT_DELETE, this.Channeid);
        this.node.destroy();
    }

    //开关私聊按钮
    ChannenameFun(eventName: string, args1: number, args2: string) {

        if (this.Channetype==args1&&this.Channeid == args2) {
            this.node.getChildByName("sprliangBg").active = true
        }
        else {
            this.node.getChildByName("sprliangBg").active = false
        }
    }
}
