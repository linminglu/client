
import GameView from "../../game/view/GameView"
import {ZhajinhuaModule} from "../ZhajinhuaModule"

const { ccclass, property } = cc._decorator;
@ccclass
export default class ZhajinhuaView extends GameView {

    constructor() {
        super();
    }

    async onLoad() {
        super.onLoad()
    }
    
    onDestroy() {
        super.onDestroy()
    }

    protected quiteGameSucc() {
        super.quiteGameSucc()
        ZhajinhuaModule.instance.hide()
    }

}