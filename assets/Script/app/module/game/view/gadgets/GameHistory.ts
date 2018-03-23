import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../config/EmitterConfig"
import { NodePoolMgr ,NodePoolKey } from "../../../../common/manager/NodePoolMgr"
const { ccclass, property } = cc._decorator;
@ccclass
export default class GameHistory extends cc.Component {

    suicide:number=null;  
    Recordbool:boolean=true;
    onLoad() {
        Emitter.register(EmitterCfg.GAME_SUICIDE, this.monitorsuicideFun, this)
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GAME_SUICIDE, this.monitorsuicideFun, this)
    }

    monitorsuicideFun(){
        if(this.Recordbool){
            this.suicide--;
            if(this.suicide==0){
                NodePoolMgr.instance.putNood(this.node, NodePoolKey.HISTORY_SUICIDE)
            }
        }
    }
    historyItemFun(data,value:number=null,bool:boolean=true) {
        this.Recordbool=bool
        if(bool){
            if(value){
                this.suicide=value;
            }else{
                this.suicide=20;
                Emitter.fire(EmitterCfg.GAME_SUICIDE)
            }
        }
        if (data==null) return;
        if (!cc.isValid(this.node)) return;
        let Histor = []
        for (let i = 1; i < 4; i++) {
            var wins = {
                type: data[i].cardType,
                outcome: data[i].result
            }
            Histor[i - 1] = wins
        }
        Histor[3] = data[0].cardType
        let gameName = GameColMgr.instance.getGameTag()
        ResCfg.loadPlist(this, gameName, function (self, Asste) {
            var win = Asste.getSpriteFrame("History-fram_log_win");
            var shu = Asste.getSpriteFrame("History-fram_log_lose");
            var flat = Asste.getSpriteFrame("History-fram_log_flat");
            let outcome = null;
            for (let i = 0; i < 3; i++) {
                var Floret = Asste.getSpriteFrame("History-txt_type_" + Histor[i].type);
                if (Histor[i].outcome == 1) {
                    outcome = win
                } else if (Histor[i].outcome == -1) {
                    outcome = shu
                } else if (Histor[i].outcome == 0) {
                    outcome = flat
                }
                if (!cc.isValid(self.node.getChildByName("yolleBg_" + i))) return;
                self.node.getChildByName("yolleBg_" + i).getComponent(cc.Sprite).spriteFrame = outcome
                var sprstate = cc.find('yolleBg_' + i + '/lblCardType' + i, self.node);
                var Sprit1 = sprstate.getComponent(cc.Sprite);
                Sprit1.spriteFrame = Floret;
            }
            var zhuang = Asste.getSpriteFrame("History-txt_Ztype_" + Histor[3]);
            self.node.getChildByName("lblCardType3").getComponent(cc.Sprite).spriteFrame = zhuang;
           
        }, true)
    }
}
