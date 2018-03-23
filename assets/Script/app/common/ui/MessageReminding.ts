const { ccclass, property } = cc._decorator;
import { EmitterManager as Emitter } from "../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../app/config/EmitterConfig";
@ccclass
export default class MessageReminding extends cc.Component {

    onLoad() {
        Emitter.register(EmitterCfg.MAIN_PROMPT, this.ReceivingPrompt, this);
        this.reddotName = this.node.name
        this.node.active = false;
        Emitter.register(EmitterCfg.ACT_REDDIAN,this.actRedDianFun,this)
    }
    onDestroy() {
        Emitter.unregister(EmitterCfg.MAIN_PROMPT, this.ReceivingPrompt, this);
        Emitter.unregister(EmitterCfg.ACT_REDDIAN,this.actRedDianFun,this)
    }

    reddotName = ""
    reddottype = "open";  //open  打开   close  关闭

    //绑定脚本时  节点名字和  args2  发送名一致

    //                               改变状态           类型名        
    ReceivingPrompt(eventName: string, args1: string, args2: string) {
        ////////////cc.log(args1)
        ////////////cc.log(args2)

        if (args1 == null) {
            if (this.reddottype == "open") {

                if (args2 == this.reddotName) {

                    this.node.active = true;
                }
            } 
        } else {

            if (args2 == this.reddotName) {
                this.reddottype = args1;
                this.node.active = false;
            }
        }



    }                                 
    actRedDianFun(eventName: string, name: string,activeBlo:boolean = false){
        if(name == this.node.name){

            this.node.active = activeBlo
            
        }

    }
}
