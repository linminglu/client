const { ccclass, property } = cc._decorator;

import { ResConfig as ResCfg } from "./app/common/util/ResConfig";
import { LoginModule } from "./app/module/login/LoginModule";
import { LayerManager as LayerMgr } from "./app/common/manager/LayerManager";
import { AndroidPlatform, PlatformMgr } from "./app/platform/PlatformMgr"

import { EmitterManager as Emitter } from "./app/common/manager/EmitterManager"
import { EmitterCfg } from "./app/config/EmitterConfig"

import { AnimationMgr } from "./app/common/manager/AnimationMgr"
import { AudioManager } from "./app/common/manager/AudioManager"

import { FuncUtil } from "./app/common/util/FuncUtil"
import { LoginController } from "./app/module/login/controller/LoginController"
import { DayinModule } from "./app/module/dayin/DayinModule"

import NetworkMgr from "./app/network/NetworkMgr"

@ccclass
export default class StartScene extends cc.Component {
    @property(cc.Sprite)
    sprLogo: cc.Sprite = null;

    @property(cc.Sprite)
    sprNameCh: cc.Sprite = null;

    @property(cc.Sprite)
    sprNameEn: cc.Sprite = null;

    isBackGround = false
    sprAnima: cc.Animation = null

    onLoad() {
        this.onEveRegister();

        //创建层管理
        LayerMgr.creatLayer();

        // if (CC_DEBUG) {
        //     if (cc.sys.isNative) {
        //         this.createDebugBtn()
        //         this.createMemory()
        //     }
        // }

        this.openLoginModuleFunc()
    }

    createMemory() {
        let node = new cc.Node()
        node.setContentSize(cc.size(60, 30))
        node.setPosition(cc.p(-500, 340))

        LayerMgr.topLayer.addChild(node, 9999)

        let lbl = node.addComponent(cc.Label)
        lbl.horizontalAlign = cc.Label.HorizontalAlign.LEFT
        lbl.node.anchorX = 0
        lbl.fontSize = 20
        lbl.string = "memory"

        node.on('touchstart', function (event) {
            let memory = PlatformMgr.getMemory()
            lbl.string = `memory：${Math.floor(memory / 1024)}MB`
        }, this)

        this.schedule(function () {
            let memory = PlatformMgr.getMemory()
            lbl.string = `memory：${Math.floor(memory / 1024)}MB`
        }, 60)
    }

    createDebugBtn() {
        let node = new cc.Node()
        node.setContentSize(cc.size(60, 30))
        node.setPosition(cc.p(-610, 340))

        LayerMgr.topLayer.addChild(node, 9999)

        let lbl = node.addComponent(cc.Label)
        lbl.fontSize = 20
        lbl.string = "debug"

        node.on('touchstart', function (event) {
            DayinModule.instance.show()
        }, this)
    }

    start() {
        this.schedule(function () {
            FuncUtil.garbageCollect()
        }, 500)
    }

    initView() {
        this.sprLogo.node.opacity = 0
        this.sprLogo.node.scale = 0.3

        this.sprNameCh.node.opacity = 0
        this.sprNameEn.node.opacity = 0
    }

    createSplashScreen() {
        let self = this
        let sequence = cc.sequence(cc.spawn(cc.fadeIn(0.5), cc.scaleTo(0.5, 1, 1)),
            cc.callFunc(function () {
                let action = cc.sequence(cc.fadeIn(0.3), cc.callFunc(function () {
                    let action = cc.sequence(cc.fadeIn(0.3), cc.delayTime(1), cc.callFunc(function () {
                        self.openLoginModuleFunc()
                    }));
                    self.sprNameEn.node.runAction(action)
                }));
                self.sprNameCh.node.runAction(action)
            }))
        this.sprLogo.node.runAction(sequence);
    }

    openLoginModuleFunc() {
        FuncUtil.delayFunc(function () {
            LoginModule.instance.show();
        }, 1, this.node)

    }

    onEveRegister() {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function (keyCode, event) {
                    if (keyCode == cc.KEY.back) {
                        AndroidPlatform.exitGame()
                    }
                },
                onKeyReleased: function (keyCode, event) {
                }
            }, this.node);
        }

        cc.game.on(cc.game.EVENT_HIDE, function (event) {
            if (!this.isBackGround) {
                this.isBackGround = true
                NetworkMgr.instance.closeNet()
                Emitter.fire(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, true)
            }
        })

        cc.game.on(cc.game.EVENT_SHOW, function (event) {
            if (this.isBackGround) {
                this.isBackGround = false
                Emitter.fire(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, false)
                FuncUtil.delayFunc(function () {
                    NetworkMgr.instance.reConnectNet()
                }, 0.05)
            }
        });
    }
}