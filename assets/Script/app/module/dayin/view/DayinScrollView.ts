const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../config/EmitterConfig"
import { DayinModel } from "../model/DayinModel"
import { DayinModule } from "../DayinModule"
import { FuncUtil } from "../../../common/util/FuncUtil"

@ccclass
export default class DayinScrollView extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Label)
    btnLabel: cc.Label = null;

    dataArr = [];
    blr: boolean = true;

    onLoad() {
        this.dataArr = DayinModel.instance.getLogList();
        this.jiantingFun(null, this.dataArr);
        Emitter.register(EmitterCfg.GLOBAL_TEST_UPDATE_LOG, this.jiantingFun, this)
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GLOBAL_TEST_UPDATE_LOG, this.jiantingFun, this)
    }

    jiantingFun(eventName, data) {   /// 监听
        ResCfg.loadPrefab(this, "txtRichTextItem", function (self, prefab) {
            let curView = null;
            for (let i = 0; i < data.length; i++) {
                curView = cc.instantiate(prefab);
                self.content.addChild(curView);
                curView.getComponent("TxtRichTextItem").updataFun(data[i], i);

            }
            if (self.blr) {
                self.node.getComponent(cc.ScrollView).scrollToBottom(0.3);
            }

            FuncUtil.delayFunc(function() {
                DayinModel.instance.clearLogList()
            }, 5, self.node)
        }, false, true)
    }

    btnShutJiemianFun() {
        DayinModel.instance.clearLogList()
        DayinModule.instance.hide();
    }

    clearBntCallBack() {
        DayinModel.instance.clearLogList()

        this.content.removeAllChildren()
    }

    btnstopAutoScroll() {
        this.node.getComponent(cc.ScrollView).stopAutoScroll()
        this.blr = !this.blr
        if (this.blr) {
            this.btnLabel.string = "停止滚动";
        } else {
            this.btnLabel.string = "开启滚动";
        }
    }

}
