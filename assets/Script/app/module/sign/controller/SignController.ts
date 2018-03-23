import { BaseController } from "../../../common/baseui/BaseController";
import { SignModel } from "../model/SignModel";
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager";
import { SignModule } from "../../sign/SignModule";
import { MainController } from "../../main/controller/MainController";
import ProtoMgr from "../../../network/ProtoMgr";
export class SignController extends BaseController {



    S_SignInInfo(msg){
        ProtoMgr.parseMsgData("activitydata", "S_SignInInfo", msg, function (data) {
            cc.log(data)
            SignModel.instance.storageSignInInfo(data)
        })
    }


    C_SignIn(param,type){
        let msgName = "C_SignIn";
        let msgData = {
            activitySeq: param,
            type:type
        }
        
        MainController.instance.C_Activity_FetchSpecificActivityReward(msgName, msgData);
    }

    S_SignIn(msg){
       

        ProtoMgr.parseMsgData("activitydata", "S_SignIn", msg.result.activityContent, function (data) {
            cc.log(data)
            SignModel.instance.SendACheckIn(data)
            
        })
       
    }

   

    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: SignController = new SignController()

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        SignController.instance = null;
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