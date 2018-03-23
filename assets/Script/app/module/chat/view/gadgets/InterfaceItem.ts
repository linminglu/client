const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { ChatModel as Model } from "../../model/ChatModel";
import { ChatController as Ctr } from "../../controller/ChatController";
@ccclass
export default class InterfaceItem extends cc.Component {


    //   对话框
    @property(cc.ScrollView)                    //滑动视图
    scroew: cc.ScrollView = null;

    identityname: string = "";      //  该界面的姓名
    Channeid: string = null;        //  该界面的 id
    strip: number = 0;               //  当前处于第多少条
    privatliao: number = 1;         //    1  大厅    2  私聊   3  房间  

    onLoad() {
        Emitter.register(EmitterCfg.CHAT_DIALOGUE, this.Getavatarname, this);

        Emitter.register(EmitterCfg.CHANNE_NAME, this.ChannenameFun, this);

        Emitter.register(EmitterCfg.CHAT_DELETE, this.daleteFun, this);

        if(Ctr.instance.EndStorage){
            Ctr.instance.EndStorage=false;
            let Messages=Model.instance.getStoreMessages();
            //////////cc.log(Messages)
            for(let i=0;i<Messages.length;i++)
            {
                Emitter.fire(EmitterCfg.CHAT_DIALOGUE, Messages[i]);
            }
        }

        cc.log(this.node.name)
        if(this.node.name=="nodeHallroom"){
            this.identityname="大厅";
            this.privatliao=1;
        }else if(this.node.name=="nodeGameroom"){
            this.identityname="游戏房间";
            this.privatliao=3;
            this.node.active=false
        }
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.CHAT_DIALOGUE, this.Getavatarname, this);

        Emitter.unregister(EmitterCfg.CHANNE_NAME, this.ChannenameFun, this);

        Emitter.unregister(EmitterCfg.CHAT_DELETE, this.daleteFun, this);
    }

    daleteFun(eventName: string, args1: string) {
        if (this.Channeid == args1) {
            this.node.destroy();
        }
    }

    //接收服务器 
    Getavatarname(eventName: string, args1: any) {         
        
        if (this.privatliao == args1.type) {
            if (args1.type == 1) {
                this.ReceiveDialogueFun(args1)
            }
            else if (args1.type == 2) {
                if (args1.sendPlayerId == this.Channeid || args1.toPlayerId == this.Channeid) {
                    this.ReceiveDialogueFun(args1)
                }
            } else if (args1.type == 3) {
                this.ReceiveDialogueFun(args1)
            }
        }
    }

    ChannenameFun(eventName: string, args1: number, args2: string) {

        if (this.privatliao==args1&&this.Channeid == args2) {
            this.node.active = true;
        }
        else {
            this.node.active = false;
        }
    }

    // i:number=1;
    //该界面数据
    InterfaceItemFun(liao, name, rid) {
        this.identityname = name;
        this.Channeid = rid;
        this.privatliao = liao
        this.node.active = true;
    }

    ReceiveDialogueFun(data)       
    {
        ResCfg.loadPrefab(this, "dialogueitem", function (self, prefab) {
            let curView = cc.instantiate(prefab);
            self.scroew.content.addChild(curView);
            curView.getComponent("DialogueItem").DialogueItemFun(data)
        }, false, true)
        Emitter.fire(EmitterCfg.CHAT_NUMBER, false);
        if (this.strip > 13) {
            setTimeout(this.scrollToBottomFun.bind(this), 200)
        }
        this.strip++;
    }

    scrollToBottomFun()       //视图始终保持在最下
    {
        this.scroew.scrollToBottom(0.1)
    }


}
