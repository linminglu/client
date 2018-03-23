import { FuncUtil } from "../../../../common/util/FuncUtil"
const {ccclass, property} = cc._decorator;
@ccclass
export default class GameLoading extends cc.Component {

    times=1;

    onLoad() {
        let self = this
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation()
        })
    }
    onDestroy() {
        this.unschedule(this.upLoadinganimFun);
    }

    onEnable() {
        this.implementLoadinganim();
    }

    onDisable() {
        this.unschedule(this.upLoadinganimFun);
    }

    implementLoadinganim(){
        if (!cc.isValid(this.node)) return;
        let time =0.1;
        let self=this;
        this.times=1;
        let sprcircle = self.node.getChildByName("sprcircle")
        let sprpeach = self.node.getChildByName("sprpeach")
        sprcircle.runAction(cc.spawn(cc.rotateBy(2, 720), cc.callFunc(function () {
            sprpeach.runAction(cc.sequence(cc.scaleTo(0.5,0.1,1),cc.scaleTo(0.5,1,1),cc.callFunc(function () {
                sprpeach.runAction(cc.sequence(cc.scaleTo(0.5,0.1,1),cc.scaleTo(0.5,1,1)))
            })))
        })))
        for(let i=1;i<=3;i++){
            let sprspot=self.node.getChildByName("sprspot"+i)
                sprspot.active=false
           }
        self.schedule(self.upLoadinganimFun, 0.4);
        FuncUtil.delayFunc(function () {
            //self.unschedule(self.upLoadinganimFun);
            self.node.active=false
        }, 2.5, self.node)
    }

    upLoadinganimFun(){
        if (this.times == 4) {
            this.times=1;
           for(let i=1;i<=3;i++){
            let sprspot=this.node.getChildByName("sprspot"+i)
                sprspot.active=false
           }
        }else{
            let spottrue=this.node.getChildByName("sprspot"+this.times)
            spottrue.active=true;
            this.times+=1;
        }
       
       
    }
}
