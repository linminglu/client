import { ResConfig as ResCfg } from "../util/ResConfig";
import { FuncUtil } from "../util/FuncUtil";
const { ccclass, property } = cc._decorator;
@ccclass
export default class TotalUI extends cc.Component {
    onLoad() {

    }

    totalItem = [];

    updateTatalFun(data: number = 0) {
        if (data == null || !cc.isValid(this.node)) return;
        ResCfg.loadPrefab(this, "totalItem", function (self, prefab) {

            let remove = FuncUtil.formatNum(data, true);
            let Remove = remove.split("");
            Remove.reverse();
            let Removelen = Remove.length;
            if (self.totalItem == null) {
                return
            }
            let totallen = self.totalItem.length
            if (Removelen > totallen) {
                for (let i = totallen; i < Removelen; i++) {
                    self.totalItem[i] = cc.instantiate(prefab);
                    self.node.addChild(self.totalItem[i]);
                }
            } else if (Removelen < totallen) {
                for (let i = Removelen; i < totallen; i++) {
                    self.totalItem[i].active = false
                }
            }

            for (let i = 0; i < Remove.length; i++) {
                let totaltrue = self.totalItem[i].active;
                if (totaltrue == false) {
                    self.totalItem[i].active = true
                }
                if (Remove[i] == ",") {
                    self.totalItem[i].getComponent('TotalItme').TotalItemFun("spot");
                } else {
                    self.totalItem[i].getComponent('TotalItme').TotalItemFun(Remove[i]);
                }
            }
        })
    }
}
