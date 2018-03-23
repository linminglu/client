import BaseView from "../../../common/baseui/BaseView";
import { EmitterManager as Emitter } from "../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../app/config/EmitterConfig"
import { LoginModel as Model } from "../model/LoginModel";
import { LoginController} from "../controller/LoginController";
import { LoginModule } from "../LoginModule";
import { AnimationMgr } from "../../../common/manager/AnimationMgr";
import NetworkMgr from "../../../network/NetworkMgr"
import {ProtoConfig, MessageConfig} from "../../../config/ProtoConfig"

import {TweenMsgView} from "../../../common/ui/TweenMsgView"
const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginView extends BaseView {
    @property(cc.Button)
    btnLogin: cc.Button = null;

    @property(cc.Sprite)
    sprLogo: cc.Sprite = null;

    @property(cc.Sprite)
    sprRole: cc.Sprite = null;
    
    @property(cc.Layout)
    layConfirmLogin: cc.Layout = null;

    @property(cc.Layout)
    nodeServe: cc.Layout = null;

    @property(cc.Animation)
    animlogo: cc.Animation = null;

    constructor() {
        super();
    }

    onLoad() {
        super.onLoad()

        Emitter.register(EmitterCfg.LOGIN_SHOW_STATE, this.showLoginState, this);

        this.sprRole.node.active = false
        this.nodeServe.node.active = false  
        this.node.getChildByName("loginLayout").active = false;
        // let anim = new AnimationMgr(this.node.getChildByName("animlogo"), "logintb",1)
        // anim.play()
        this.node.getChildByName("sprBg").on(cc.Node.EventType.TOUCH_START, function(event){
            event.stopPropagation();
        })
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.LOGIN_SHOW_STATE, this.showLoginState, this);

        super.onDestroy()
    }

    showLoginState() {
        this.btnLogin.node.active = true
        this.sprLogo.node.active = true
        this.sprRole.node.active = false
    }

    btnLoginCallBack() {
        this.node.getChildByName("loginLayout").active = true
        this.animlogo.stop();
        this.animlogo.node.active=false
        this.btnLogin.node.active = false
        this.sprLogo.node.active = false
        this.sprRole.node.active = true
    }
}