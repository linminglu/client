import {NiuniuModule} from "../NiuniuModule"
import GameView from "../../game/view/GameView"

const {ccclass, property} = cc._decorator

@ccclass
export default class NiuniuView extends GameView {
    onLoad() {
        super.onLoad()
    }
    
    onDestroy() {
        super.onDestroy()
    }
    
    protected quiteGameSucc() {
        super.quiteGameSucc()
        
        NiuniuModule.instance.hide()
    }
}