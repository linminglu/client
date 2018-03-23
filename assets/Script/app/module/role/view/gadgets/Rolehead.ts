const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";

@ccclass
export default class Rolehead extends cc.Component {

    @property(cc.ScrollView)
    Scrol: cc.ScrollView = null;

    onLoad() {
        ResCfg.loadPrefab(this, "roleheaditem", function (self, prefab) {
            for (let i = 1; i <= 12; i++) {
                if (!cc.isValid(self.node)) return;
                let curView1 = cc.instantiate(prefab);
                self.Scrol.content.addChild(curView1);
                curView1.getComponent('Roleheaditem').RoleheaditemFun(1000 + i);
            }
        })
    }

}
