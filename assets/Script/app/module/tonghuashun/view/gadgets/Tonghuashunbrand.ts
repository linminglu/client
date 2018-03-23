

import GameCards from "../../../game/view/gadgets/GameCards"
const { ccclass, property } = cc._decorator;

@ccclass
export default class Tonghuashunbrand extends GameCards {


    onLoad() {
        super.setCardsCfg(4, 5)
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }

    startFaPaiFun() {
        super.startFaPaiFun()
    }


}
