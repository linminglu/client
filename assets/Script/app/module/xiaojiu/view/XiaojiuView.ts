import {XiaojiuModule} from "../XiaojiuModule"
import GameView from "../../game/view/GameView"

const {ccclass, property} = cc._decorator

@ccclass
export default class XiaojiuView extends GameView {
    onLoad() {
        super.onLoad()
    }
    
    onDestroy() {
        super.onDestroy()
    }
    
    protected quiteGameSucc() {
        super.quiteGameSucc()
        
        XiaojiuModule.instance.hide()
    }
}