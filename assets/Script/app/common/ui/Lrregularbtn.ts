const { ccclass, property } = cc._decorator;
//import { TonghuashunDesktop as TongDes } from "../../module/tonghuashun/view/gadgets/TonghuashunDesktop"
@ccclass
export default class Lrregularbtn extends cc.Component {

    @property(cc.PolygonCollider)
    collider: cc.PolygonCollider = null;
    @property(cc.Node)
    nodeChip: cc.Node = null;

    bool:boolean=false;
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch, event) => {
                var touchLoc = touch.getLocation();
                if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
                    this.JudgeyourselfFun()
                }
                return true;
            },
        }, this.node);
    }

    onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }

    RestoreOrDisabl(bool:boolean)
    {
        this.bool=bool;
    }
    
    JudgeyourselfFun()   //判断自己是谁
    {
        if (this.bool) {
            if (this.node.name == "nodedesktop1") {
                this.nodeChip.getComponent("NodeAreaBtnAndChip").btnArea_4_CallBack();
                //////cc.log("  点  到  了  第  一  块  ")
            }
            else if (this.node.name == "nodedesktop2") {
                this.nodeChip.getComponent("NodeAreaBtnAndChip").btnArea_3_CallBack();
                //////cc.log("  点  到  了  第  二  块  ")
            }
            else if (this.node.name == "nodedesktop3") {
                this.nodeChip.getComponent("NodeAreaBtnAndChip").btnArea_2_CallBack();
                //////cc.log("  点  到  了  第  三  块  ")
            }
        }
    }
}
