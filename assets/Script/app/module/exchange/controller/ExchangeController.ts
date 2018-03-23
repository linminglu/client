import { BaseController } from "../../../common/baseui/BaseController";
import { ExchangeModel as Model } from "../model/ExchangeModel";
import { ExchangeModule } from "../ExchangeModule";
import { MainModule } from "../../main/MainModule";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig";
import { MainController } from "../../main/controller/MainController";
import ProtoMgr from "../../../network/ProtoMgr";
export class ExchangeController extends BaseController {


    S_ExchangeInfo(msg) {
        cc.log(msg)
        ProtoMgr.parseMsgData("activitydata", "S_ExchangeInfo", msg, function (data) {
            
            Model.instance.storageExchangeInInfo(data)

        })
    }

    C_Exchange(param,type) {
        let msgName = "C_SignIn";
        let msgData = {
            activitySeq: param,
            exchange:type
        }
        
        MainController.instance.C_Activity_FetchSpecificActivityReward(msgName, msgData);
    }
    S_Exchange() {
	
    }
   
    public static instance: ExchangeController = new ExchangeController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        ExchangeController.instance = null;
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