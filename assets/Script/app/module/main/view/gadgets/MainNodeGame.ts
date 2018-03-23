import { MainModule } from "../../MainModule";
import { LoginModule } from "../../../login/LoginModule";
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import GameItem from "./GameItem";
import { FuncUtil } from "../../../../common/util/FuncUtil"
import { MainModel } from "../../model/MainModel"
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr"

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainNodeGame extends cc.Component {

    Vexwidth: number = 266;
    @property(cc.Button)
    btnLeft: cc.Button = null;

    @property(cc.Button)
    btnRight: cc.Button = null;

    @property(cc.ScrollView)
    scrGame: cc.ScrollView = null;

    lstData = []
    prefabList = []
    posTab = []

    onLoad() {
        Emitter.register(EmitterCfg.MAIN_HIDES, this.hidesFun, this);

        // MainModel.instance.registerModelChanged("GAME_CUR_GAME_TYPE", this.updateView, this)

        let self = this
        FuncUtil.delayFunc(function () {
            self.updateView()
        }, 0.5, this.node)
    }

    onDestroy() {
        Emitter.unregister(EmitterCfg.MAIN_HIDES, this.hidesFun, this);

        // MainModel.instance.unregisterModelChanged("GAME_CUR_GAME_TYPE", this.updateView, this)
    }

    updateView() {
        let data = MainModel.instance.getGameData()
        this.scrGame.node.getContentSize()

        let parentNode = this.scrGame.content;
        let scrSize = parentNode.getContentSize();

        let self = this

        for (let i = 0; i < data.length; i++) {
            // FuncUtil.delayFunc(function () {
            self.scheduleOnce(function () {
                // let gameType = data[i].gameType

                // if (cc.isValid(self.prefabList[i])) {
                //     let curView = self.prefabList[i]
                //     curView.getComponent(GameItem).updateItemFun(data[i])
                // } else {
                ResCfg.loadPrefab(self, "gameItem", function (self, prefab) {
                    let curView = cc.instantiate(prefab)
                    let posX = curView.getContentSize().width * 1
                    curView.setPosition(cc.p(posX, -scrSize.height / 2))
                    parentNode.addChild(curView)
                    curView.getComponent(GameItem).updateItemFun(data[i])
                    self.prefabList[i] = curView
                }, false, true)
                // }
                // }, 0.1 * i, self.node)
            }, 0.1 * i)
        }
    }

    hidesFun(eventName: string, args1: number) {
        if (args1 == 0) {
            this.node.active = false;
        }
        else {
            this.node.active = true;
        }

    }

    btnLeftCallBack() {
        let Coord = this.scrGame.getScrollOffset();
        Coord.x = -Coord.x
        Coord.x -= this.Vexwidth;
        this.scrGame.scrollToOffset(cc.p(Coord.x, 0), 0.5);

    }

    btnRightCallBack() {
        let Coord = this.scrGame.getScrollOffset();
        Coord.x = -Coord.x
        Coord.x += this.Vexwidth;
        this.scrGame.scrollToOffset(cc.p(Coord.x, 0), 0.5);

    }

}
