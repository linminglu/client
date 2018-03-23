import { BaseController } from "../../../common/baseui/BaseController";
import { ErbagangModel as Model } from "../model/ErbagangModel";
import { ErbagangModule } from "../ErbagangModule";
import { MainModule } from "../../main/MainModule";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
export class ErbagangController extends BaseController {

     /////////以下必须函数///////////////////////////////////////////////////////
     public static instance: ErbagangController = new ErbagangController()
 
     destructor() {
         super.destructor();
 
         this.delEveRegister();     //移除监听
         ErbagangController.instance = null;
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