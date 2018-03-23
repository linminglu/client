
import { ResConfig as ResCfg } from "../../common/util/ResConfig"
import {EmitterManager as Emitter} from "../manager/EmitterManager"
import {EmitterCfg} from "../../../app/config/EmitterConfig"

const { ccclass, property, executionOrder} = cc._decorator

@ccclass
@executionOrder(-1)
export default class JettonBtn extends cc.Component {
    data: any = null
    
    async onLoad() {
        Emitter.register(EmitterCfg.GAME_SELECT_JETTON, this.selectJettonFun, this)
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GAME_SELECT_JETTON, this.selectJettonFun, this)
    }
    
    selectJettonFun(eventName:string, data) {
        this.node.getChildByName("spLight").active = data == this.data
        if(data == this.data){
            Emitter.fire(EmitterCfg.GAME_PARTICLE, this.node.position)
        }
        
    }

    updateViewFun(data) {
        this.data = data
        
        ResCfg.loadPlist(this, "common", function (self, atlas) {
            self.node.getChildByName("sprJetton").getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(`jetton-${data.jettonImg}`)
        })
    }


}
