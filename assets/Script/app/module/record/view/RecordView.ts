const {ccclass, property} = cc._decorator;
import { RecordModel } from "../model/RecordModel"
import { RecordModule } from "../RecordModule"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
@ccclass
export default class RecordView extends cc.Component {

    btnArr = [];
    scrollArr = []
    optionView: cc.Node = null
    onLoad() {
        this.node.getChildByName("sprBg1").getChildByName("sprLoad").runAction(cc.repeatForever(cc.rotateBy(1.5, 360)))
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        this.btnArr = this.node.getChildByName("nodeBtnType").children;
        this.optionView = this.node.getChildByName("recordFindLay").getChildByName("optionView")
        //this.optionView.active = false;
        this.scrollArr = this.node.getChildByName("scrollViewLay").children;
        this.btnArr[0].getComponent(cc.Button).interactable = false;  
        Emitter.register(EmitterCfg.GAME_EXIT_GAME, this.btnShutCallBack, this)
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.Chonglian, this)
    }
 
    onDestroy() {

        Emitter.unregister(EmitterCfg.GAME_EXIT_GAME, this.btnShutCallBack, this)
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.Chonglian, this)
    }

    Chonglian(){
        this.btnShutCallBack()
    }

    btnLisCallBack(data) {

        let Name = data.currentTarget.name
        for (let i = 0; i < 4; i++) {
            if (Name == this.btnArr[i].name) {
                Emitter.fire(EmitterCfg.GAME_HISTORY_PAGE,i)
                if (i == 2) {
                    this.optionView.active = false
                } else {
                    this.optionView.active = true;
                    this.optionView.getChildByName("optionScroll").active = false
                }
                RecordModel.instance.setstateYe(i);
                this.btnArr[i].getComponent(cc.Button).interactable = false;
                this.scrollArr[i].active = true
            } else {
                this.btnArr[i].getComponent(cc.Button).interactable = true;
                this.scrollArr[i].active = false;
            }
        }

    }
    btnShutCallBack() {
        //cc.log("***************************====",cc.pool.prototype.getFromPool())
        //****RecordModel.instance.setFindTime(0, 0);
        // RecordModel.instance.setRecordFindLay_num(0);
        // RecordModel.instance.setFindShowArr(null, null);
        RecordModel.instance.initModelFun();
        RecordModule.instance.hide();
    }

}
