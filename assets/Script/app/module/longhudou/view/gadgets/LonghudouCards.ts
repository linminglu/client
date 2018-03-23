import GameCards from "../../../game/view/gadgets/GameCards"

const { ccclass, property } = cc._decorator

@ccclass
export default class LonghudouCards extends GameCards {

    onLoad() {
        super.setCardsCfg(2, 1)
        super.onLoad()
    }

    onDestroy() {
        super.onDestroy()
    }

    startFaPaiFun() {
        super.startFaPaiFun()
    }
    
}
