import { GameManager } from "../../../../common/manager/GameManager"
import PlayerItem from "../../../../common/ui/PlayerItem"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"

const { ccclass, property } = cc._decorator

@ccclass
export default class GamePlayers extends cc.Component {

    onLoad() {
        GameManager.instance.registerModelChanged("COMMON_ROOM_PLAYER_CHANGE", this.roomPlayersChange, this)
        this.GamePlayersinit()
    }

    onDestroy() {

        GameManager.instance.unregisterModelChanged("COMMON_ROOM_PLAYER_CHANGE", this.roomPlayersChange, this)
    }
    GamePlayersinit() {
        let roomPlayers = GameManager.instance.getRoomPlayerMsg()
        this.roomPlayersChange(null, roomPlayers)
    }
    roomPlayersChange(eventName: string, msg) {
  
         let gameState = GameManager.instance.getGamePlayState()
        let arrplayers = this.arrayspliceFun(msg.players) //[]


        for (let i = 0; i < 6; i++) {
            let nodePlayer = this.node.getChildByName(`playerItem${i}`)

            if (i < arrplayers.length) {
                nodePlayer.getComponent(PlayerItem).updateView(arrplayers[i])
            } else {
                nodePlayer.getComponent(PlayerItem).updateView(null)
            }
            if (i == 5) {
                nodePlayer.active = gameState == 0
            }

        }

    }

    arrayspliceFun(valuearr){
        let xingarr=[]
        let playerMsg = GameManager.instance.getPlayerMsg()     
        for(let i=0;i<valuearr.length;i++){
            if(valuearr[i].playerId!=playerMsg.playerId){
                xingarr.push(valuearr[i]);
            }
        }
        return xingarr
    }
}
