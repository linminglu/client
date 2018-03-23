import {HelpModule} from "../HelpModule"
import BaseView from "../../../common/baseui/BaseView";
import { ResConfig as ResCfg } from "../../../common/util/ResConfig";
import { FuncUtil } from "../../../common/util/FuncUtil"
import { GameCollectManager as GameColMgr } from "../../../common/manager/GameCollectManager"
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
const {ccclass, property} = cc._decorator
@ccclass
export default class HelpView extends BaseView {

    @property(cc.Button)
    btnHelpArr: cc.Button[] = []

    @property(cc.Sprite)
    content:cc.Sprite = null;

    @property(cc.ScrollView)
    s_crollView:cc.ScrollView = null;

    gameTagStr:string = null;

    onLoad() {
        //////cc.log("GameColMgr====================", GameColMgr.instance.getGameTag());
            ResCfg.loadPlist(this, "help", function (self, atlas) {        
                self.content.spriteFrame = atlas.getSpriteFrame(`icon_game_0`);
            }, true)
       
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation();
        })
        Emitter.register(EmitterCfg.GAME_EXIT_GAME, this.btnHelpShutCallBack, this)
    }
    onDestroy() {
        Emitter.unregister(EmitterCfg.GAME_EXIT_GAME, this.btnHelpShutCallBack, this)
        super.destructor();
    }

    btnHelpShutCallBack() {                                                                                                 
        HelpModule.instance.hide();
    }
    btnHelpOddAndPlaymethodCallBack(data){
        let Name = data.currentTarget.name
        for(let i = 0; i < 2 ;i++){
            if(Name == this.btnHelpArr[i].node.name){
                this.btnHelpArr[i].interactable = false
                this.sprContentSwitchFun(i);
            }else{
                this.btnHelpArr[i].interactable = true;
            }
        }
    }

    sprContentSwitchFun(num:number){
        ResCfg.loadPlist(this, "help", function (self, atlas) {        
            self.content.spriteFrame = atlas.getSpriteFrame(`icon_game_${num}`);
            self.upscrollViewFun();
        }, true)
    } 

    upscrollViewFun(){
        this.s_crollView.scrollToTop(0.1);
    }
}