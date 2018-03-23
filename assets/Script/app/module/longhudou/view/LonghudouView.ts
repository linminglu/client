import BaseView from "../../../common/baseui/BaseView";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { FuncUtil } from "../../../common/util/FuncUtil"
import { LonghudouModel} from "../../longhudou/model/LonghudouModel"
import { SettingModule } from "../../setting/SettingModule"
import { MainController } from "../../main/controller/MainController"
import { GameManager }    from "../../../../app/common/manager/GameManager"
import {AudioManager} from "../../../common/manager/AudioManager"
import {ChatModule} from "../../chat/ChatModule"
import {GameCollectManager as GameColMgr} from"../../../common/manager/GameCollectManager"
import GameView from "../../game/view/GameView"
import {LonghudouModule} from "../LonghudouModule";
//import {SprTime} from "../../../common/ui/SprTime"
const { ccclass, property } = cc._decorator;
@ccclass
export default class LonghudouView extends GameView {
    @property(cc.Node)
    layClose:cc.Node = null;

    unTime:Function = null
    constructor() {
        super();
    }

    async onLoad() {
        //cc.log("1111111111111111111111111111111111111111");
        //this.upCloseInitUIFun();
        super.onLoad()
       
    }
    
    onDestroy() {
        super.onDestroy()
        if(this.unTime){
            this.unschedule(this.unTime)
        }
    }

    protected quiteGameSucc() {
        super.quiteGameSucc()
        LonghudouModule.instance.hide()
    }
    
    protected startComparePaiFun() {

        //if(this.layClose){
           // ////cc.log("****************LonghudouView*********************")
            let closeData = GameManager.instance.getStartAward();
           if(closeData[0].cardType == undefined||closeData[0].cardType == null) return
            this.layClose.active = true;
            this.layClose.getComponent("LayClose").upDataCloseFun();
      
            this.unTime =function () {
                 this.layClose.getComponent("LayClose").btnShutCloseCallBack();//关闭界面    
                   Emitter.fire(EmitterCfg.GAME_END_COMPARE_PAI);
                 //LonghudouModel.instance.setBettingInfoMoney(0);
             }
            this.scheduleOnce(this.unTime,2.5)
        //}
    }
 
    upCloseInitUIFun(){
        ResCfg.loadPrefab(this, "layClose", function (self, prefab) {
            self.layClose = cc.instantiate(prefab);
            self.node.addChild(self.layClose,1);
            self.layClose.active = false;
        }, true, true);
    }

 }