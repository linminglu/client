import GameCards from "../../../game/view/gadgets/GameCards"

const { ccclass, property } = cc._decorator

@ccclass
export default class XiaojiuCards extends GameCards {

    onLoad() {
        super.setCardsCfg(4, 2)
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }

    startFaPaiFun() {
        super.startFaPaiFun()
    }
    
}
