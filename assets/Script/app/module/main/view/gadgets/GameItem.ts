import { MainModule } from "../../MainModule";
import { LoginModule } from "../../../login/LoginModule";
import { MainController } from "../../controller/MainController";
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { TonghuashunController as TonghsCont } from "../../../tonghuashun/controller/TonghuashunController"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { AnimationMgr } from "../../../../common/manager/AnimationMgr"
import { FuncUtil } from "../../../../common/util/FuncUtil"

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(-1)
export default class GameItem extends cc.Component {
    @property(cc.Sprite)
    sprName: cc.Sprite = null

    @property(cc.Sprite)
    sprState: cc.Sprite = null
    
    data: any = null;
    anim = null
    anim1 = null

    async onLoad() {
        Emitter.register(EmitterCfg.MAIN_ENTER_GAME, this.sprHighlightCallBack, this);

        this.node.on('touchstart', this.touchstartCallBack, this);
        this.node.on('touchend', this.touchendCallBack, this);
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.MAIN_ENTER_GAME, this.sprHighlightCallBack, this);

        this.node.off('touchstart', this.touchstartCallBack, this);
        this.node.off('touchend', this.touchendCallBack, this);
    }

    updateItemFun(data) {
        this.data = data;
        ResCfg.loadPlist(this, "main", function (self, atlas) {
            let spriteFrame = atlas.getSpriteFrame(`main-txt_${data.gameTag}`);
            self.sprName.spriteFrame = spriteFrame;

            if (data.tagType == 2) {
                self.sprState.node.active = true
                self.sprState.spriteFrame = atlas.getSpriteFrame(`main-icon_hot`)
            } else if (data.tagType == 1) {
                self.sprState.node.active = true
                self.sprState.spriteFrame = atlas.getSpriteFrame(`main-icon_new`)
            } else {
                self.sprState.node.active = false
            }
        });

        this.anim = new AnimationMgr(this.node.getChildByName("nodeAnim"), data.gameTag)
        this.anim1 = new AnimationMgr(this.node.getChildByName("sprAnim"), "xuanzhong")

        let self = this
        FuncUtil.delayFunc(function() {
            if (data.light == 1) {
                self.play()
            } else {
                self.sprHighlightCallBack()
            }
        }, 0.1, self.node)
    }


    play() {
        if (cc.isValid(this.anim)) {
            this.anim.play(function () {})
        }

        this.node.getChildByName("sprAnim").active = true

        if (cc.isValid(this.anim1)) {
            this.anim1.play()
        }
    }

    sprHighlightCallBack() {
        if (cc.isValid(this.anim)) {
            this.anim.stop()
        }
        
        this.node.getChildByName("sprAnim").active = false

        if (cc.isValid(this.anim1)) {
            this.anim1.stop()
        }
    }

    touchstartCallBack() {
        Emitter.fire(EmitterCfg.MAIN_ENTER_GAME, false);
        // this.sprHighlight.node.active = true;

        this.play()
    }

    touchendCallBack() {
        // //////cc.log(this.data)
        MainController.instance.setGameColloectMgr(this.data)
    }
}
