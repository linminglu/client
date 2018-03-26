import {BaseController} from "../../../common/baseui/BaseController";
import {ActivityModel as Model} from "../model/ActivityModel";
import {ActivityModule} from "../ActivityModule";
import {MainModule} from "../../main/MainModule";
import { ActivityModel } from "../model/ActivityModel"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig";
import { MainController } from "../../main/controller/MainController"
import ProtoMgr from "../../../network/ProtoMgr"
export class ActivityController extends BaseController {
    public static instance: ActivityController = new ActivityController()


    /*C_Activity_GetSpecificActivity : "activity", //获取指定活动信息
	S_Activity_GetSpecificActivity : "activity", //获取指定活动信息请求结果
	C_Activity_FetchSpecificActivityReward : "activity", //获取指定活动奖励
    S_Activity_FetchSpecificActivityReward : "activity", //获取指定活动奖励请求结果*/
  
    S_DayActiveTips(){    //红点
        // console.log("活动222222222大厅活动外红点2222222222222222====22=红点")//大厅活动外红点

        // Emitter.fire(EmitterCfg.ACT_REDDIAN,"newRed",true)
    }

    C_DayActive(param){
        let msgName = "C_DayActive";
        let msgData = {
            activitySeq: param,
        }
        
        MainController.instance.C_Activity_FetchSpecificActivityReward(msgName, msgData);
    }
    S_DayCompleteInfo(msg){
       // console.log("ssss=====sssssssssssssssss=====        ",msg)
        ProtoMgr.parseMsgData("activitydata", "S_DayCompleteInfo", msg.availableActivityInfos.activityContent, function (data) {
            
            ActivityModel.instance.setDayCompleteInfo(data)
                             
        })
    }
    S_Activity_GetSpecificActivity(msg){       
        
        let activityType = 0;
        activityType = msg.availableActivityInfos.activityType
        if (activityType == 2) {   //积分领取更新
            
            this.S_DayCompleteInfo(msg)
        }

                
    }
    S_DayActive(mag){

        ActivityModel.instance.setResult(mag)
    }

    destructor() {
        super.destructor();
        ActivityController.instance = null;
    }
    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }
    addNetRegister() {

         this.netWorkMgr.register("S_DayActiveTips", this.S_DayActiveTips, this);
         this.netWorkMgr.register("S_Activity_GetSpecificActivity",this.S_Activity_GetSpecificActivity,this)
    }

    addEveRegister() {
        
    }

    delEveRegister() {
    }
}