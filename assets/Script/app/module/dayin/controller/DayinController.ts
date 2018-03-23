import { BaseController } from "../../../common/baseui/BaseController";
import { MainModule } from "../../main/MainModule";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
export class DayinController extends BaseController {

    public EndStorage:boolean=true;
    
  
    confirmChatFunc(accountStr: string, passwordStr: string) {


    }
    public static instance: DayinController = new DayinController()
    
    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        DayinController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }

    addNetRegister() {

    }

    addEveRegister() {
    }

    delEveRegister() {
    }
    
}