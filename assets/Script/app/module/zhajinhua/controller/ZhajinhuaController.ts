import { BaseController } from "../../../common/baseui/BaseController";
import { ZhajinhuaModel as Model } from "../model/ZhajinhuaModel";
import { ZhajinhuaModule } from "../ZhajinhuaModule";
import { MainModule } from "../../main/MainModule";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
export class ZhajinhuaController extends BaseController {
    // //开始投注
    // S_StartBetting(msg) {
    //     Emitter.fire(EmitterCfg.Zhajinhua_TIME,"StartBetting" ,msg);
    // }
    // //开始发牌
    // S_StartAward(msg) {
    //     Emitter.fire(EmitterCfg.Zhajinhua_TIME,"StartAward" ,msg);
    //  }
     /////////以下必须函数///////////////////////////////////////////////////////
     public static instance: ZhajinhuaController = new ZhajinhuaController()
 
     destructor() {
         super.destructor();
 
         this.delEveRegister();     //移除监听
         ZhajinhuaController.instance = null;
     }
 
     private constructor() {
         super();
         this.addNetRegister();     //网络监听
         this.addEveRegister();     //事件监听
     }
 
     addNetRegister() {
        //  this.register("S_StartBetting", this.S_StartBetting, this);
        //  this.register("S_StartAward", this.S_StartAward, this);
     }
 
     addEveRegister() {
     }
 
     delEveRegister() {
     }
    
}