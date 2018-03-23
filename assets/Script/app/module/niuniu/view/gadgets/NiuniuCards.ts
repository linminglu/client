import GameCards from "../../../game/view/gadgets/GameCards"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../config/EmitterConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { FuncUtil } from "../../../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator

@ccclass
export default class NiuniuCards extends GameCards {

    onLoad() {
        super.setCardsCfg(4, 5)
        super.onLoad()

        Emitter.register(EmitterCfg.GAME_END_COMPARE_PAI, this.playerCardPosition, this)

    }

    onDestroy() {
        super.onDestroy()
    }

    startFaPaiFun() {
        super.startFaPaiFun()
    }


    playerCardPosition() {
        let cardDataArr =   GameManager.instance.getStartAward();
        let nodeS = null; 
        if(!this.node)return;
        let self = this
        FuncUtil.delayFunc(function(){
            for(let i = 0 ; i < 4 ; i++){
                nodeS =  self.node.getChildByName("nodePlayer"+i);
                self._niuniuTheCardFun2(nodeS,cardDataArr[i].cardType);
            }
        },0.2,this.node)   
       
    }
    _niuniuTheCardFun2(nodePlayerCrad, cardType, index: number = 0)
    {   if(nodePlayerCrad == null) return;
        let nodeArr = nodePlayerCrad.children;
        let k = 0;
        if (cardType > 0 && cardType < 11) {
            for(let i = 0 ;i < 3 ;i++){
                if(i != 0){
                    nodeArr[i].setPosition(cc.p(nodeArr[k].getPosition().x+24,nodeArr[0].getPosition().y));
                    k++;
                }
              }
              nodeArr[3].setPosition(cc.p(nodeArr[4].getPosition().x-24,nodeArr[0].getPosition().y));
        }
    }
}
