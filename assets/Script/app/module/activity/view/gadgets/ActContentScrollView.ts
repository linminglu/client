
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { ActivityModel } from "../../model/ActivityModel"
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { FactoryUtil } from "../../../../common/util/FactoryUtil"
import { ActivityController } from "../../controller/ActivityController"
const { ccclass, property } = cc._decorator;
@ccclass
export default class ActContentScrollView extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    activitySeqArr: number[] = [] //奖励
    dataArr: any = [
        { name: "activity", num: 1 },
        { name: "activity", num: 2 },
        { name: "activity", num: 3 },
        { name: "activity", num: 4 },
        { name: "activity", num: 5 },
        { name: "activity", num: 6 },
        { name: "activity", num: 7 },
        { name: "activity", num: 8 },
        { name: "activity", num: 9 },
        { name: "activity", num: 10 },

    ];
    objArr = []
    Content1: cc.Node = null
    Content2: cc.Node[] = []

    Content: cc.Node[] = []

    onLoad() {
        // init logic
        ActivityModel.instance.registerModelChanged("ACTLIST_DATA", this.upDataActivityFun, this)
        ActivityModel.instance.registerModelChanged("ACT_GET_RESULT", this.resultFun, this) //领取结果返回
        Emitter.register(EmitterCfg.MAIN_BNT_ACTIVITY, this.contentChangeFun, this);
        this.Content2 = this.node.getChildByName("view").children
        this.node.getComponent(cc.ScrollView).content = this.Content2[0];
        let dataArr = ActivityModel.instance.getActivityList()
        this.upDataActivityFun("null",dataArr)
    }
    onDestroy(){
        ActivityModel.instance.unregisterModelChanged("ACTLIST_DATA", this.upDataActivityFun, this)
        ActivityModel.instance.unregisterModelChanged("ACT_GET_RESULT", this.resultFun, this) //领取结果返回
        Emitter.unregister(EmitterCfg.MAIN_BNT_ACTIVITY, this.contentChangeFun, this);
        super.destroy()
    }
    upDataActivityFun(eventName: string, dataArr) {
        this.dataArr = dataArr
        // if (this.dataArr.length > 6) {
        //     this.sprBelowLogo.active = true;
        // }

        console.log(this.dataArr)

        let num = 0
        for (let i = this.dataArr.length - 1; i >= 0; i--) {        //2两个活动
            ++num;
            this.Content2ChangeFun(num, this.dataArr[i])
        }


    }

    Content2ChangeFun(magNum, data) {

        let num = magNum - 1
        // console.log(this.Content2[num].children[0])
        //console.log("data================",data)
        // optional int32 activitySeq = 1;//活动排期流水号
        // optional int32 complete = 2;//当天完成局数
        // optional int32 reward = 3;//奖励积分
        // optional int32 gameTotal = 4;//需要完成的总局数
        //	optional int32 state = 5;//状态（0-未完成  1-未领取  2-已领取）
        //cc.log("总活动======数据===",data)
        if (magNum == 1) {                                                           //签到活动
            cc.log(this.Content2[num].children[0])
            this.Content2[num].children[0].getComponent(cc.Label).string = data.receiveIntegral.toString()
            this.Content2[num].children[1].getComponent(cc.Label).string = (data.continueDay - data.count).toString()
            this.Content2[num].children[2].getComponent(cc.Label).string = data.reward.toString()
        } else if (magNum == 2) {                                                   //每日积分活动
            console.log("活动===2====数据===", data)
            if (data.complete == data.gameTotal) {

                if (data.state == 1) {
                    this.Content2[num].children[3].active = true  //领取按钮
                    // console.log("红点亮了")       
                    Emitter.fire(EmitterCfg.ACT_REDDIAN_INSIDE,1,true)
                } else {
                    this.Content2[num].children[3].active = false  //领取按钮
                    Emitter.fire(EmitterCfg.ACT_REDDIAN_INSIDE,1,false)
                }
                this.Content2[num].children[1].getComponent(cc.Label).string = "0";

            } else {
                this.Content2[num].children[1].getComponent(cc.Label).string = (data.gameTotal - data.complete).toString()
                //this.Content2[num].children[3].active = false  //领取按钮

            }
            this.Content2[num].children[0].getComponent(cc.Label).string = data.gameTotal.toString()
            this.Content2[num].children[2].getComponent(cc.Label).string = data.reward.toString()
        }

        this.activitySeqArr[num] = data.activitySeq;
    }

    contentChangeFun(eventName: string, num: number) {

        for (let i = 0; i < this.Content2.length; i++) {
            if (num == i) {
                this.Content2[i].active = true;
                this.node.getComponent(cc.ScrollView).content = this.Content2[i]
            } else {
                this.Content2[i].active = false;
            }

        }
    }

    getRewardCallBack(data, eventData) { //领取奖励
      
        ActivityController.instance.C_DayActive(this.activitySeqArr[eventData])
        
    }
    resultFun(eventName: string, tag) {     //领取返回
        if (tag == 0) {
            FactoryUtil.createAlertConfirmView("领取失败")
        } else {
            FactoryUtil.createAlertConfirmView("领取成功")
            Emitter.fire(EmitterCfg.ACT_REDDIAN_INSIDE,1,false)
            this.Content2[1].children[3].active = false  //领取按钮
        }

    }
}
