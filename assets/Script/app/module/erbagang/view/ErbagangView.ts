
import GameView from "../../game/view/GameView"
import {ErbagangModule} from "../ErbagangModule"

const { ccclass, property } = cc._decorator;
@ccclass
export default class ErbagangView extends GameView {

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
        ErbagangModule.instance.hide()
    }

}