/////////////////////////////////////////////////////
///user:hp
///data:2017.10.24
///info:登录model
/////////////////////////////////////////////////////

import {BaseModel} from "../../../common/baseui/BaseModel"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
export class ActivityModel extends BaseModel {
    public actitvityList = new Array()
    public getResult  = null

    /*C_Activity_GetSpecificActivity : "activity", //获取指定活动信息
	S_Activity_GetSpecificActivity : "activity", //获取指定活动信息请求结果
	C_Activity_FetchSpecificActivityReward : "activity", //获取指定活动奖励
    S_Activity_FetchSpecificActivityReward : "activity", //获取指定活动奖励请求结果*/
    setActivityList(msg){
        this.actitvityList = msg;
        console.log( this.actitvityList );
        if(this.actitvityList.length > 0){
            if( this.actitvityList[0].state == 1){
                Emitter.fire(EmitterCfg.ACT_REDDIAN,"newRed",true)   //大厅活动红点
            }
        }
        this.changedModel("ACTLIST_DATA",this.actitvityList)
    }
    getActivityList(){
        return this.actitvityList
    }

    setResult(msg){   // 领取情况
        this.getResult = msg.result
        this.changedModel("ACT_GET_RESULT",this.getResult)
    }

    getActivitySeq(num){       ///活动的seq号

        return this.actitvityList[num].activitySeq;

    }

    // setActGetSpecificActivity(msg){
    //     cc.log("活动==================================",msg)
    // }
    // getActGetSpecificActivity(){
    //     return
    // }
    // setFetchSpecificActivityReward(msg){

    // }
    // getFetchSpecificActivityReward(){
    //     return 
    // }
    
    destructor() {
        super.destructor();
        ActivityModel.instance = null;
        
    }

    public static instance: ActivityModel = new ActivityModel()

    private constructor() {
        super();
    }
}