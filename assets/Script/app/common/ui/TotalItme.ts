import { ResConfig as ResCfg } from "../../common/util/ResConfig";
const {ccclass, property} = cc._decorator;
@ccclass
export default class TotalItme extends cc.Component {


    TotalItemFun(data)
    {
        
        if(data=="spot")
        {   
             ResCfg.loadPlist(this,"txt_gold_total",function(self, sprit) {
             let txtHead= sprit.getSpriteFrame("txt_gold_total-txt_gold_pause");
             if (cc.isValid(self.node)){
                let ctlNum = self.node.getChildByName("lblNum")
                let sprnum = ctlNum.getComponent(cc.Sprite);
                sprnum.spriteFrame = txtHead;
            }
             })
        }
        else{
            ResCfg.loadPlist(this,"txt_gold_total",function(self, sprit) {
                let txtHead= sprit.getSpriteFrame("txt_gold_total-"+data);
                if (cc.isValid(self.node)){
                    let ctlNum = self.node.getChildByName("lblNum")
                    let sprnum = ctlNum.getComponent(cc.Sprite);
                    sprnum.spriteFrame = txtHead;
                }
             })
        }
    }


}
