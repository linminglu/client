import GameBtn from "../../../game/view/gadgets/GameBtn"
import { SettingModule } from "../../../setting/SettingModule"
const {ccclass, property} = cc._decorator;

@ccclass
export default class ZhajinhuaBtn extends GameBtn {

    onLoad() {
        super.onLoad()

    }

    onDestroy() {
        super.onDestroy()
    }

    initView() {
        super.initView()
    }

    btnSettingCallBack() {
        cc.director.loadScene("game2");
        SettingModule.instance.show("main")
    }
}
