const {ccclass, property} = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
@ccclass
export default class WeekItem extends cc.Component {

    ReceiveWeekFun(data){
        if(data=="week"){
            ResCfg.loadPlist(this,"main",function(self, sprit) {
                let Plist= sprit.getSpriteFrame("sign-icon_Week_Division");
                self.node.getChildByName("lblWeek").getComponent(cc.Label).spriteFrame = Plist;
             })
        }else{
            ResCfg.loadPlist(this,"main",function(self, sprit) {
                let Plist= sprit.getSpriteFrame("sign-icon_Date_segmentation");
                self.node.spriteFrame = Plist;
             })
        }
    }
}
