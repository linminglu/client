
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { ActivityModel } from "../../model/ActivityModel"
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import {FactoryUtil} from "../../../../common/util/FactoryUtil"
import { ActivityController } from "../../controller/ActivityController"
const { ccclass, property } = cc._decorator;
@ccclass
export default class ActivityScrollView extends cc.Component {

    @property(cc.Node)
    sprUpLogo: cc.Node = null;
    @property(cc.Node)
    sprBelowLogo: cc.Node = null;
    @property
    activityNum:number =  2  //活动数量

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
   
    Content:cc.Node = null
    contentArr = []
    onLoad() {
           // this.Content = this.node.getComponent(cc.ScrollView).content.children
        this.Content = this.node.getComponent(cc.ScrollView).content
        this.contentArr =  this.Content.children
        // this.Content2 = this.contentScrollView.node.getChildByName("view").children
        // this.contentScrollView.content = this.Content2[0]
        this.sprUpLogo.active = false;
        this.sprBelowLogo.active = false;
   
       Emitter.register(EmitterCfg.ACT_REDDIAN_INSIDE, this.redDianShow, this);

    }

    onDestroy() {
       // this.destroyObjFun();
       Emitter.unregister(EmitterCfg.ACT_REDDIAN_INSIDE, this.redDianShow, this);
       
    }
    // upDataActivityFun(eventName: string, dataArr) {
    //     this.dataArr = dataArr
    //     if (this.dataArr.length > 6) {
    //         this.sprBelowLogo.active = true;
    //     }

    //      console.log(this.dataArr)
    //     ResCfg.loadPrefab(this, "noticeActivityItem", function (self, Prefab) {
    //         let num = 0
    //         for (let i = self.dataArr.length - 1; i >= 0; i--) {        //2两个活动
    //             let prefab = NodePoolMgr.instance.getNood(NodePoolKey.MAIN_ACT)
    //             if (cc.isValid(prefab)) {
    //                 self.node.getComponent(cc.ScrollView).content.addChild(prefab);
    //                 prefab.getComponent("NoticeActivityItem").upDataSprHandoverFun("activity", ++num);
    //                 self.objArr.push(prefab)
    //             } else {
    //                 let ctrNotice = null;
    //                 ctrNotice = cc.instantiate(Prefab);
    //                 ctrNotice.getComponent("NoticeActivityItem").upDataSprHandoverFun("activity", ++num);
    //                 self.node.getComponent(cc.ScrollView).content.addChild(ctrNotice);
    //                 self.objArr.push(ctrNotice)
    //             }
    //             self.Content2ChangeFun(num, self.dataArr[i])
    //         }

    //     }, false, true)
    // }

    btnActivityFun(data,eventNum){

        for( let i = 0 ; i < this.activityNum ; i++){
                if(i == eventNum){
                    this.contentArr[i].children[0].active = false;
                    this.contentArr[i].children[1].active = true;
                    this.contentArr[i].getComponent(cc.Button).interactable = false
                    Emitter.fire(EmitterCfg.MAIN_BNT_ACTIVITY , i)
                }else{
                    this.contentArr[i].children[0].active = true;
                    this.contentArr[i].children[1].active = false;
                    this.contentArr[i].getComponent(cc.Button).interactable = true
                }
        }
    }



    // destroyObjFun() {
    //     for (let i = 0; i < this.objArr.length; i++) {
    //         if (cc.isValid(this.objArr[i])) {
    //             NodePoolMgr.instance.putNood(this.objArr[i], NodePoolKey.MAIN_ACT)
    //             //this.turnaccountArr.splice(i, 1);
    //         }
    //     }
    // }
    upSprLogoOutFun() {

        let Coord: cc.Vec2 = this.node.getComponent(cc.ScrollView).getScrollOffset();
        let maxCoord: cc.Vec2 = this.node.getComponent(cc.ScrollView).getMaxScrollOffset();
        if (this.activityNum < 7) {
            return;
        }
        // if (Coord.y <= 0) {
        //     this.sprUpLogo.active = false;
        //     this.sprBelowLogo.active = true;
        // } else if (Coord.y < maxCoord.y && Coord.y > 0) {
        //     this.sprUpLogo.active = true;
        //     this.sprBelowLogo.active = true;
        // } else if (Coord.y >= maxCoord.y) {
        //     this.sprUpLogo.active = true;
        //     this.sprBelowLogo.active = false;
        // }

    }
    
    // getRewardCallBack(data, eventData) {

    //    // console.log(this.activitySeqArr[eventData - 1])
    //     ActivityController.instance.C_DayActive(this.activitySeqArr[eventData - 1])

    // }

    // resultFun(eventName:string,tag) {
    //     if(tag == 0){
    //         FactoryUtil.createAlertConfirmView("领取失败")
    //     }else{
    //         FactoryUtil.createAlertConfirmView("领取成功")
    //         this.objArr[1].getComponent("NoticeActivityItem").sprRedChangeShowFun(false)
    //         this.Content2[1].children[3].active = false  //领取按钮
    //     }
    
    // }

    redDianShow(eventName:string, num:number, blo:boolean){
        //红点的显示
        this.contentArr[num].children[2].active = blo;
        //console.log("活动222222222大厅活动外红点2222222222222222====22=红点")//大厅活动外红点
        Emitter.fire(EmitterCfg.ACT_REDDIAN,"newRed",blo)

    }
}
