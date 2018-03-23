const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig"
import { Express } from "../../../../../GameConfig"

@ccclass
export default class BrowItem extends cc.Component {
    //  表情
    @property(cc.Sprite)
    Expression: cc.Sprite = null;
    identity: string = "";

    onLoad() {
        var self = this
        this.node.on('touchend', function (event) {
            self.touchendCallBack();
        }, this);

    }
    //表情
    BrowItemFun(data) {
        this.identity = Express[data].unbind;
        ResCfg.loadPlist(this, "Expression", function (self, sprit) {
            self.Expression.spriteFrame = sprit.getSpriteFrame("Expression-icon_" + data);
        })
    }
    //发送
    touchendCallBack() {
        Emitter.fire(EmitterCfg.CHAT_TOTAL, this.identity);
    }
}
