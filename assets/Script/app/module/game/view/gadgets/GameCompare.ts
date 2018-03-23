import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { GameManager } from "../../../../common/manager/GameManager"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager"
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { FuncUtil } from "../../../../common/util/FuncUtil"

const { ccclass, property } = cc._decorator
@ccclass
export default class GameCompare extends cc.Component {

    protected xianNum: number = 0; //几个闲家
    protected typepk = [];

    onLoad() {
        let self = this
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            event.stopPropagation()
        })
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        this.node.stopAllActions()
    }

    onEnable() {
    }

    onDisable() {
    }

    showView() {
        this.node.active = true;
        this.receivecompareFun();
    }

    gameEnterBackGround(eventName: string, isBackGround: boolean = true) {
        if (isBackGround) {
            this.node.stopAllActions()
            this.node.active = false;
        }
    }

    receivecompareFun() {
        if (!cc.isValid(this.node)) return;
        let skip: number = cc.sys.localStorage.getItem(FuncUtil.getSettingTag("SKIP_AINM"))
        if (skip == 1) {
            Emitter.fire(EmitterCfg.GAME_END_COMPARE_PAI)
            this.node.active = false;
            return;
        }
        let data = GameManager.instance.getStartAward()
        let xunh = this.xianNum + 1
        let self = this;

        for (let i = 1; i <= xunh; i++) {
            FuncUtil.delayFunc(function () {
                let CompareItem = self.node.getChildByName("compareItem").getComponent("CompareItem")
                let skip1: number = cc.sys.localStorage.getItem(FuncUtil.getSettingTag("SKIP_AINM"))
                if (skip1 == 1 || i == xunh) {
                    CompareItem.Initialization()
                    Emitter.fire(EmitterCfg.GAME_END_COMPARE_PAI);
                    self.node.stopAllActions()
                    FuncUtil.delayFunc(function () {
                        self.node.active = false;
                    }, 0.1, self.node)
                } else {
                    FuncUtil.delayFunc(function () {
                        CompareItem.Initialization()
                    }, 0.01, self.node)
    
                    FuncUtil.delayFunc(function () {
                        CompareItem.receiveCompareItemFun(data[i].cardType, data[0].cardType, data[i].result, i)
                    }, 0.5, self.node)
                }
            }, 3 * (i - 1) + 0.5, self.node)
        }
    }

    btnCloseInterfaceFun() {
        this.node.stopAllActions()
        Emitter.fire(EmitterCfg.GAME_END_COMPARE_PAI);
        let CompareItem = this.node.getChildByName("compareItem").getComponent("CompareItem")
        CompareItem.Initialization()
        let self=this
        FuncUtil.delayFunc(function () {
            self.node.active = false;
        }, 0.1, this.node)
    }

    btnCloseAnimationFun() {
        let tag = FuncUtil.getSettingTag("SKIP_AINM")

        let bool: number = cc.sys.localStorage.getItem(tag)
        if (bool == 1) {
            bool = 0;
        } else {
            bool = 1;
        }
        
        cc.sys.localStorage.setItem(tag, bool)
    }

}