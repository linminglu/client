import BaseView from "../../../common/baseui/BaseView";
import { ExchangeModule } from "../ExchangeModule";

const { ccclass, property } = cc._decorator;
@ccclass
export default class ExchangeView extends BaseView {

    onLoad() {
        this.node.getChildByName("nodeBg").on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
    }

    btnCloseCallBack() {
        ExchangeModule.instance.hide();
    }
}