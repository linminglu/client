
import GameView from "../../game/view/GameView"
import {TonghuashunModule} from "../TonghuashunModule"

const { ccclass, property } = cc._decorator;
@ccclass
export default class TonghuashunView extends GameView {

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
        TonghuashunModule.instance.hide()
    }

}