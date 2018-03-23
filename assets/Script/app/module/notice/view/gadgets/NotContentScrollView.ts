const {ccclass, property} = cc._decorator;
import ActContentScrollView  from "../../../activity/view/gadgets/ActContentScrollView"
@ccclass
export default class NotContentScrollView extends ActContentScrollView {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    onLoad() {
      super.onLoad()
      
    }
    onDestroy(){
        super.onDestroy()
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
                cc.log(data)
                if (magNum == 1) {                                                           //签到活动
                    cc.log(this.Content2[num].children[0])
                    this.Content2[num].children[0].getComponent(cc.Label).string = data.receiveIntegral.toString()
                    this.Content2[num].children[1].getComponent(cc.Label).string = (data.continueDay - data.count).toString()
                    this.Content2[num].children[2].getComponent(cc.Label).string = data.reward.toString()
                } else if (magNum == 2) {                                                   //每日积分活动
                    console.log("活动=======数据===", data)
                    if (data.complete == data.gameTotal) {
        
                        // if (data.state == 1) {
                            this.Content2[num].children[3].active = false  //领取按钮
                        //     // console.log("红点亮了")       
                        //     Emitter.fire(EmitterCfg.ACT_REDDIAN_INSIDE,1,true)
                        // } else {
                        //     this.Content2[num].children[3].active = false  //领取按钮
                        //     Emitter.fire(EmitterCfg.ACT_REDDIAN_INSIDE,1,false)
                        // }
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
            
}
