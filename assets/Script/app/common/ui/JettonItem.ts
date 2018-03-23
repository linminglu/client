
import { ResConfig as ResCfg } from "../../common/util/ResConfig"


const { ccclass, property, executionOrder } = cc._decorator

@ccclass
// @executionOrder(1)
export default class GameItem extends cc.Component {
    data: any = null

    onLoad() {

    }

    onDestroy() {

    }

    updateItemFun(data, callBack: Function = null) {
        this.data = data
        // //////cc.log("3----updateItemFun----------", data)
        ResCfg.loadPlist(this, "common", function (self, atlas) {
            if (cc.isValid(self.node)) {
                let spr = self.node.getComponent(cc.Sprite)
                spr.spriteFrame = atlas.getSpriteFrame(`jetton-jetton_icon_${data}`)

                if (callBack) {
                    callBack()
                }
            }
        })
    }
}
