const {ccclass, property} = cc._decorator;
import { FuncUtil } from "../../../../common/util/FuncUtil"
@ccclass
export default class Loginxp extends cc.Component {


    onLoad() {
        let self=this;
        let anim=0;
        for(let i=0;i<4;i++){
            FuncUtil.delayFunc(function () {
                self.node.getChildByName("sprscreen"+anim).runAction(cc.sequence(cc.moveBy(0.1, 0, 20),cc.moveBy(0.2, 0, -20)))
                anim++;
                },0.3*i,self.node)
        }
    }
}
