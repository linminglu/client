import { ResConfig as ResCfg } from "../../common/util/ResConfig"
import { GameManager } from "../../../app/common/manager/GameManager"
import { IconArr } from "../../../GameConfig"
import { GameCollectManager as GameColMgr } from "../manager/GameCollectManager"
import { EmitterManager as Emitter } from "../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../app/config/EmitterConfig"
import { FuncUtil } from "../../common/util/FuncUtil"
const { ccclass, property } = cc._decorator
@ccclass
export default class PlayerItem extends cc.Component {

    @property(cc.Node)
    sprBg: cc.Node = null;

    @property(cc.Sprite)
    sprTou: cc.Sprite = null

    @property(cc.Sprite)
    sprBox: cc.Sprite = null

    @property(cc.Label)
    lblName: cc.Label = null

    @property(cc.Label)
    lblID: cc.Label = null

    timeS: number = 0;
    playerId = null;

    blr: boolean = true;
    hideNode:cc.Node = null;
    clickPlayerName:string = ""
    action1 = null
    action2 = null

    onLoad() {
        //GameManager.instance.registerModelChanged("COMMON_ROOM_PLAYER_CHANGE", this.upperandlowerZhuang, this);
        Emitter.register(EmitterCfg.COM_PLAYER_BOX, this.upInitYidouBoxFun, this)
     
        let self = this;
        this.action1= cc.sequence(cc.moveTo(0.1, cc.v2(0, 0)), cc.callFunc(function () {
            self.blr = true;
        }))
        this.action2 = cc.sequence(cc.moveTo(0.1, cc.v2(-130, 0)), cc.callFunc(function () {
            self.blr = true;
            self.hideNode.active = false
        }))
        this.sprTou.node.on('touchstart', function (event) {
            if (self.blr && this.playerId != null) {
              self.clickPlayerName = self.node.name
                self.upYidouBoxFun_1();
            }
        }, this);
    }

    onDestroy() {
        //GameManager.instance.unregisterModelChanged("COMMON_ROOM_PLAYER_CHANGE", this.upperandlowerZhuang, this);
        Emitter.unregister(EmitterCfg.COM_PLAYER_BOX, this.upInitYidouBoxFun, this)
    }

    // upperandlowerZhuang(eventName: string, aegs) {
    //     if (aegs.players.length == 1) {
    //         this.node.getChildByName("sprZmark").active = false;
    //         if(aegs.players[0].banker == 1){
    //             if (aegs.players[0].playerId == this.playerId) {
    //                 GameManager.instance.setRoomPlayerzhuang(this.playerId,1)
    //                 this.node.getChildByName("sprZmark").active = true;
    //             }
    //         }
           
    //     } else if (aegs.players.length > 1) {
    //         this.node.getChildByName("sprZmark").active = false;
    //         for (let i = 0; i < aegs.players.length; i++) {
    //             if (aegs.players[i].banker == 1) {
    //                 if (aegs.players[i].playerId == this.playerId) {
    //                     GameManager.instance.setRoomPlayerzhuang(this.playerId,1)
    //                     this.node.getChildByName("sprZmark").active = true;
    //                 }
    //             }
    //         }
    //     }
    // }

    upInitYidouBoxFun() {
        this.hideNode = this.sprBg.getChildByName("hideNode")
        let self = this
        // let act = cc.sequence(cc.moveTo(0.1, cc.v2(-130, 0)), cc.callFunc(function () {
        //     self.blr = true;
        //     self.hideNode.active = false
        // }))
        // if(this.blr){
        //     this.blr = false;
        //     this.sprBg.runAction(act); 
        //     cc.log("222222222222222222222222222222")
           
        // }
        if(this.blr){
            this.blr = false;
            this.sprBg.runAction(this.action2); 
           // cc.log("222222222222222222222222222222")
           
        }
       
    }
    upYidouBoxFun_1() {
        this.hideNode = this.sprBg.getChildByName("hideNode")
        let self = this
        self.hideNode.active = true
        // let act = cc.sequence(cc.moveTo(0.1, cc.v2(0, 0)), cc.callFunc(function () {
        //     self.blr = true;
        // }))
        if(self.node.name == self.clickPlayerName){
            if(this.sprBg.getPositionX() == -130){
                if(this.blr){
                    this.blr = false;
                    this.sprBg.runAction(this.action1);
                }
               
            }else{
                if(this.blr){
                    this.blr = false;
                    this.sprBg.runAction(this.action2);
                }
            }
        }
        // if(this.blr){
        //     this.blr = false;
        //     this.sprBg.runAction(act);
        //     cc.log("1111111111111111111111111111111")
            
        //}
       
    }
    setYidouBoxPisFun(){
        this.hideNode = this.sprBg.getChildByName("hideNode")
        let self = this
    
             this.sprBg.setPosition(cc.p(-130,0));
             this.hideNode.active = false;
        
        this.node.getChildByName("sprZmark").active = false;
    }

    updateView(data=null) {  

        let playerId = null
        let playerName = ""
        let playerIconId = GameColMgr.instance.getGameTag()
        //let gameName = GameColMgr.instance.getGameTag()
        // cc.log('列表进来')
        this.setYidouBoxPisFun();
        if (data != null) {
            playerId = data.playerId
            playerName = data.playerName
            playerIconId = data.iconId
            if(data.banker==1){
                let sprZmark=this.node.getChildByName("sprZmark")
                sprZmark.active = true;
            }
           
          
        }
      
        
      
        this.playerId = playerId

        this.lblName.string = playerName
        this.lblID.string = playerId == null ? "" : playerId.toString()

        ResCfg.loadPlist(this, "common", function (self, Asste) {
            self.sprTou.spriteFrame = Asste.getSpriteFrame(IconArr[playerIconId].icon)
        })
       
    }

    PlayerItemFun(data) {
        this.playerId = data.playerId
        this.lblName.string = data.playerName
        this.lblID.string = data.playerId
        if (data.banker == 1) {
            this.node.getChildByName("sprZmark").active = true;
        }
        ResCfg.loadPlist(this, "common", function (self, Asste) {

            self.sprTou.spriteFrame = Asste.getSpriteFrame(IconArr[data.iconId].icon)
        })
    }

    

}
