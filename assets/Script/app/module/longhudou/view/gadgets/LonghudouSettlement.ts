const { ccclass, property } = cc._decorator;
import GameSettlement from "../../../game/view/gadgets/GameSettlement"
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { GameManager } from "../../../../common/manager/GameManager"
@ccclass
export default class LonghudouSettlement extends GameSettlement {


    onLoad() {
        super.onLoad()
    }
    onDestroy() {
        super.onDestroy()
    }
    ReceiveSettlementFun() {
        let balance = GameManager.instance.getWinOrLose();
        if (!balance) return
        if (balance.result > 0) {
            this.node.active = true;
            //this.implementSettlementFun(100095.56)
           this.implementSettlementFun(balance.result)
            let self = this;
            FuncUtil.delayFunc(function () {
                self.node.active = false;
            }, 2, self.node)
        }
        GameManager.instance.setWinOrLose(null);
    }

}
