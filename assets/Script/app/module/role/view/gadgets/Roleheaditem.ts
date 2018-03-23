const { ccclass, property } = cc._decorator;
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../config/EmitterConfig"
import { IconArr } from "../../../../../GameConfig"
@ccclass
export default class Roleheaditem extends cc.Component {


    onLoad() {
        Emitter.register(EmitterCfg.ROLE_DIANJI, this.pitchzhiix, this);
    }

    onDestroy() {

        Emitter.unregister(EmitterCfg.ROLE_DIANJI, this.pitchzhiix, this);
    }
    dianji: number = 0;
    RoleheaditemFun(data) {
        this.dianji = data;
        ResCfg.loadPlist(this, "common", function (self, Asste) {
            var Floret = Asste.getSpriteFrame(IconArr[data].icon);
            self.node.getChildByName("sprHead").getComponent(cc.Sprite).spriteFrame = Floret
        })
    }

    btnpitchFun() {
        Emitter.fire(EmitterCfg.ROLE_DIANJI, this.dianji);
    }


    pitchzhiix(eventName: string, args1: number) {
        if (this.dianji == args1) {
            this.node.getChildByName("sprelect").active = true
        }
        else {
            this.node.getChildByName("sprelect").active = false
        }

    }



}
