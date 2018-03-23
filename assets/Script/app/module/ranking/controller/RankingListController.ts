import {BaseController} from "../../../common/baseui/BaseController";
import {RankingListModel} from "../model/RankingListModel";
import {RankingListModule} from "../RankingListModule";
import { MainController } from "../../main/controller/MainController"
export class RankingListController extends BaseController {
  
    /////////以下必须函数///////////////////////////////////////////////////////
    public static instance: RankingListController = new RankingListController()




    C_IntegralRank(param){
        let msgName = "C_IntegralRank";
        RankingListModel.instance.setDataType(param.num)
        let msgData = {
            activitySeq: param.seq,
            type:param.num
        } 
        MainController.instance.C_Activity_FetchSpecificActivityReward(msgName, msgData);
    }
    S_IntegralRank(mag){
    
        RankingListModel.instance.setIntegralRankDataList(mag)

    }

    S_Activity_GetSpecificActivity(mag){


        console.log("当前排行sssssssssssssssssssssssssssssssssssssss榜数据======",mag)
        
    }

    destructor() {
        super.destructor();

        this.delEveRegister();     //移除监听
        RankingListController.instance = null;
    }

    private constructor() {
        super();
        this.addNetRegister();     //网络监听
        this.addEveRegister();     //事件监听
    }
    addNetRegister() {
        this.netWorkMgr.register("S_Activity_GetSpecificActivity",this.S_Activity_GetSpecificActivity, this);
    }
    addEveRegister() {        
    }
    delEveRegister() {
    }
    

}