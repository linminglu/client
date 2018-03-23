import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
const {ccclass, property} = cc._decorator;
@ccclass
export default class NumResultsItem extends cc.Component {

    @property(cc.Sprite)
    txtResults: cc.Sprite = null;
    upDataInitFun(data)
    {
        ResCfg.loadPlist(this,"txt_time",function(self,atlas){

            self.txtResults.spriteFrame=atlas.getSpriteFrame(`txt_time-${data}`);
        })
    }

}
