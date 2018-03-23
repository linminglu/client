import { ResConfig as ResCfg } from "../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../app/config/EmitterConfig"
const { ccclass, property } = cc._decorator;
@ccclass
export default class NoticeActivityItem extends cc.Component {

    @property(cc.Node)
    btnNoticeActivity: cc.Node = null;
    @property(cc.Sprite)
    txtNoticeActivity: cc.Sprite = null;
    @property(cc.Sprite)
    txtNumActivity: cc.Sprite = null;
    sprRed: cc.Node = null
    num: number = null;
    nameCf: string = null;
    onLoad() {
        this.sprRed = this.node.getChildByName("sprRed")
        console.log("111111111111111111----------")
    }
    onDestroy() {
       // Emitter.unregister(EmitterCfg.MAIN_BNT_ACTIVITY, this.upDataActivityFun, this);
    }
    

    btnNoticeCallBack(data, eventNum) {
        console.log("eventNumeventNumeventNumeventNumeventNumeventNum==",eventNum)
        console.log("111111111111111111111111=====")
        //Emitter.fire(EmitterCfg.MAIN_BNT_ACTIVITY, this.num, this.nameCf);
        this.iffff()
    }
    iffff(){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    }
   
    sprRedChangeShowFun(bol: boolean) {

        this.sprRed.active = bol;
    }


}
