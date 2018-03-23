const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { Roomlevel } from "../../../../../GameConfig"
import { MainController } from "../../controller/MainController";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager";
import { LayerManager as LayerMgr } from "../../../../common/manager/LayerManager";
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { AnimationMgr } from "../../../../common/manager/AnimationMgr";
@ccclass
export default class EsessionItem extends cc.Component {


    animicon = null;
    animpeach = null;
    animting = null;
    data = null
    viewLoading = null;
    onLoad() {
        Emitter.register(EmitterCfg.MAIN_DATING, this.Monitoranim, this);

        this.node.on('touchstart', this.touchstartCallBack, this);
        this.node.on('touchend', this.touchendCallBack, this);
        this.animicon = new AnimationMgr(this.node.getChildByName("animicon"), "ziyuan")
        this.animpeach = new AnimationMgr(this.node.getChildByName("animpeach"), "mainting")
        this.animting = new AnimationMgr(this.node.getChildByName("animbox"), "maintingbox")
        this.animicon.stop();
        this.animpeach.stop();
        this.animting.stop();
        this.node.getChildByName("animicon").active = false
        this.node.getChildByName("animbox").active = false
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.MAIN_DATING, this.Monitoranim, this);

        this.node.off('touchstart', this.touchstartCallBack, this);
        this.node.off('touchend', this.touchendCallBack, this);
    }

    Monitoranim() {
        this.animicon.stop();
        this.animpeach.stop();
        this.animting.stop();
        this.node.getChildByName("animicon").active = false
        this.node.getChildByName("animbox").active = false
    }

    updateItemFun(data) {
        this.data = data
        let num = data.iconId - 1
        ResCfg.loadPlist(this, "main", function (self, Asste) {
            var Picture1 = Asste.getSpriteFrame(Roomlevel[num].spricon);
            var Picture2 = Asste.getSpriteFrame(Roomlevel[num].sprname);

            self.node.getChildByName("spricon").getComponent(cc.Sprite).spriteFrame = Picture1;
            self.node.getChildByName("sprname").getComponent(cc.Sprite).spriteFrame = Picture2;
            let lblquota = data.minMoney / 100;
            self.node.getChildByName("lblquota").getComponent(cc.Label).string = "(最小下注金额" + lblquota + ")";
        })
    }

    touchstartCallBack() {

        Emitter.fire(EmitterCfg.MAIN_DATING, false);
        this.node.getChildByName("animicon").active = true
        this.node.getChildByName("animbox").active = true
        this.animicon.play();
        this.animpeach.play();
        this.animting.play();
    }

    touchendCallBack() {
        if (!cc.isValid(this.viewLoading)) {
            ResCfg.loadPrefab(this, "loadingView", function (self, prefab) {
                self.viewLoading = cc.instantiate(prefab)
                LayerMgr.alertLayer.addChild(self.viewLoading, 5000)
            }, false, false)
        } else {
            this.viewLoading.active = true;
        }
        GameColMgr.instance.setGameArr(this.data)
        MainController.instance.C_EnterGame({ gameId: this.data.gameId })
    }
}
