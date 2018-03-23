const {ccclass, property} = cc._decorator;
import { LayerManager} from "../../../../common/manager/LayerManager";
import { AnimationMgr  } from "../../../../common/manager/AnimationMgr";
@ccclass
export default class Recordingbtn extends cc.Component {
    anim:any=null;

    @property(cc.Node)
    sprChatBg: cc.Node = null;
    onLoad() {
        var self=this;
        this.node.on('touchstart', function (event) {
            self.touchFun();
        }, this);
        this.node.on('touchcancel', function (event) {
            self.unscrewFun();
        }, this); 
        this.node.on('touchend', function (event) {
            self.unscrewFun();
        }, this); 
        
    }

    touchFun(){
        this.sprChatBg.active=true;
        this.anim = new AnimationMgr(this.sprChatBg, "PlayTheTape", 0)
    }
    unscrewFun(){
        this.anim.destructor();
        this.sprChatBg.active=false;
    }
}
