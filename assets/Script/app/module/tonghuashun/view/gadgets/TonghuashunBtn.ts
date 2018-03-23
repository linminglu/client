
import { SettingModule } from "../../../setting/SettingModule";
import GameBtn from "../../../game/view/gadgets/GameBtn";

const { ccclass, property } = cc._decorator;
@ccclass
export default class TonghuashunBtn extends GameBtn {


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
        SettingModule.instance.show("main")
    }

}
