import { FuncUtil } from "../../../../common/util/FuncUtil"
const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingSkip extends cc.Component {



    onLoad() {
        // init logic

        let boak=FuncUtil.getSettingTag()
        if(boak==null){
            this.node.active=false;
            return;
        }
        let bool = cc.sys.localStorage.getItem(FuncUtil.getSettingTag("SKIP_AINM"))
        if (bool == null) {
            cc.sys.localStorage.setItem(FuncUtil.getSettingTag("SKIP_AINM"), 0)
            bool = 0
        }
        if (bool == 0) {
            if (cc.isValid(this.node.getChildByName("btnComparative"))) {
                this.node.getChildByName("btnComparative").getComponent(cc.Toggle).isChecked = false;
            }

        }
    }

    btnComparativeFun() {
        let tag = FuncUtil.getSettingTag("SKIP_AINM")

        let bool: number = cc.sys.localStorage.getItem(tag)
        if (bool == 1) {
            bool = 0;
        } else {
            bool = 1;
        }
        cc.sys.localStorage.setItem(tag, bool)
    }
}
