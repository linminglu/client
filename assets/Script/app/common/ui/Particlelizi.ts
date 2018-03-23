const {ccclass, property} = cc._decorator;
import {EmitterManager as Emitter} from "../manager/EmitterManager"
import {EmitterCfg} from "../../../app/config/EmitterConfig"
@ccclass
export default class Particlelizi extends cc.Component {

 

    onLoad() {
        // init logic
        Emitter.register(EmitterCfg.GAME_PARTICLE, this.selectParticleFun, this)
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GAME_PARTICLE, this.selectParticleFun, this)
    }

    selectParticleFun(eventName: string, positio){
        this.node.setPosition(positio)
    }
}
