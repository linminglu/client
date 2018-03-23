const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
@ccclass
export default class ChatBrow extends cc.Component {
    //  加载全部表情

    onLoad() {
        this.generateFun();
    }

    generateFun() {
        ResCfg.loadPrefab(this, "expressionItem", function (self, prefab) {
            for (let i = 0; i < 70; i++) {
                let curView = cc.instantiate(prefab);
                self.node.getChildByName("sprPhizLay").addChild(curView);
                curView.getComponent("BrowItem").BrowItemFun(i);
            }
        })
    }
}
