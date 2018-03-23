import GameTime from "../../../game/view/gadgets/GameTime"

const { ccclass, property } = cc._decorator

@ccclass
export default class LonghudouTime extends GameTime {
    onLoad() {
        super.setTxtType("txt_gold_total")
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }
}
