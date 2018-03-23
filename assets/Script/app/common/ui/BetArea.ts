import { ResConfig as ResCfg } from "../util/ResConfig"
import {GameModel} from "../../module/game/model/GameModel"

const { ccclass, property } = cc._decorator

@ccclass
export default class BetArea extends cc.Component {
    canTouch: boolean = false

    onLoad() {
        // this.node.active = false
        
        cc.director.getCollisionManager().enabledDebugDraw = true
        // cc.director.getCollisionManager().enabled = false
        cc.director.getCollisionManager().enabled = true
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch, event) => {
                var touchLoc = touch.getLocation()
                if (cc.Intersection.pointInPolygon(touchLoc, this.node.getComponent(cc.PolygonCollider).world.points)) {
                    this.onTouchFun()
                }
                return true
            },
        }, this.node)
    }

    onDestroy() {

    }

    onEnable() {
        // cc.director.getCollisionManager().enabled = true
    }

    onDisable() {
        // cc.director.getCollisionManager().enabled = false
    }

    setTouchState(state) {
        // cc.director.getCollisionManager().enabled = state

        this.canTouch = state
    }

    onTouchFun() {
        
        if (this.canTouch) {
            let betAreaIdx = this.node.name.replace(/[^0-9]/ig, "")
            GameModel.instance.touchBetJetton(Number(betAreaIdx))
        }
    }
}
