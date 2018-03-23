import { ResConfig as ResCfg } from "../../common/util/ResConfig";
import { GameManager } from "../manager/GameManager"
import { GameCollectManager as GameColMgr } from "../manager/GameCollectManager"
import { EmitterManager as Emitter } from "../manager/EmitterManager"
import { EmitterCfg } from "../../config/EmitterConfig"
import { FuncUtil } from "../util/FuncUtil"
import { NodePoolMgr, NodePoolKey } from "../manager/NodePoolMgr"
const { ccclass, property } = cc._decorator;

@ccclass
export default class HistoryUI extends cc.Component {

    VexX: number = 0;
    Vexwidth: number = 96;
    Slidingnew: number = null;//新数据
    Sliding: number = null; //旧数据
    direction: string = null;//滑动方向   Left    right

    historyreal = null;               //  数据历史

    historyempty = null;            //  空历史

    @property(cc.ScrollView)                    //滑动视图
    scroew: cc.ScrollView = null;

    onLoad() {

        GameManager.instance.registerModelChanged("COMMON_TIONRONROBZHUANG", this.receivesprnewFun, this)
        Emitter.register(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        Emitter.register(EmitterCfg.GAME_RECORD, this.nodeRecordfalse, this)
        Emitter.register(EmitterCfg.GAME_END_COMPARE_PAI, this.endCompareFun, this)

        let self = this
        this.scroew.node.on("scroll-ended", function () {
            self.Slidingnew = null;
            self.Sliding = null;
            let Coord = self.scroew.getScrollOffset();
            let Coord1 = parseInt(Coord.x + "")
            Coord.x = Coord1;
            let coornub = Coord1 % self.Vexwidth;
            if (coornub == 0) return;
            let Differential = Math.abs(coornub) + 1
            if (Differential == self.Vexwidth) return;
            if (self.direction == "Left") {
                Coord.x -= coornub;
            } else {
                let vexwid = -self.Vexwidth
                coornub = vexwid - coornub
                Coord.x += coornub;
            }
            Coord.x = - Coord.x;
            self.scroew.scrollToOffset(cc.p(Coord.x, 0), 0.2);
        })

        this.getinto()
    }

    onDestroy() {
        GameManager.instance.unregisterModelChanged("COMMON_TIONRONROBZHUANG", this.receivesprnewFun, this)
        Emitter.unregister(EmitterCfg.GLOBAL_ENTER_BACK_GROUND, this.gameEnterBackGround, this)
        Emitter.unregister(EmitterCfg.GAME_RECORD, this.nodeRecordfalse, this)

        Emitter.unregister(EmitterCfg.GAME_END_COMPARE_PAI, this.endCompareFun, this)
    }

    gameEnterBackGround(eventName: string, isBackGround: boolean = true) {
        if (!isBackGround) {
            // let gameState = GameManager.instance.getGameState()
            // let Record = this.node.getChildByName("nodeRecord")
            // if (cc.isValid(Record)) this.node.getChildByName("nodeRecord").active = gameState == 1
        } else {
            let Record = this.node.getChildByName("nodeRecord")
            if (cc.isValid(Record)) this.node.getChildByName("nodeRecord").active = false
        }
    }

    endCompareFun() {
        let Record = this.node.getChildByName("nodeRecord")
        if (cc.isValid(Record)) this.node.getChildByName("nodeRecord").active = true
    }

    nodeRecordfalse() {
        let self = this;
        FuncUtil.delayFunc(function () {
            let Record = self.node.getChildByName("nodeRecord")
            if (cc.isValid(Record)) self.node.getChildByName("nodeRecord").active = false
        }, 0.01, self.node)
    }

    getinto() {
        let GameLogList = GameManager.instance.getGameLogListFun()

        let gameName = GameColMgr.instance.getGameTag()
        // let Capital = gameName.substr(0, 1)
        // let Capital1 = Capital.toLocaleUpperCase()
        // let gameTag = gameName.replace(Capital, Capital1)

        let gameTag = "GameHistory"
        if (gameName == "longhudou") {
            gameTag = "LonghudouHistory"
        }
        ResCfg.loadPrefab(this, "historyItem", function (self, prefab) {
            let nodeMask = null
            let masklen = GameLogList.length
            let enterGame = GameManager.instance.getEnterGame()
            let value = 10
            if (enterGame.state == 1) {
                masklen -= 1
                value = 11
            }
            for (let i = 0; i < masklen; i++) {
                let historyprefab = cc.instantiate(prefab);
                nodeMask = historyprefab.getChildByName("sprMaskBox");
                self.scroew.content.addChild(historyprefab);
                historyprefab.getChildByName("newestBg").active = false;
                //historyprefab.getComponent(gameTag + "History").historyItemFun(GameLogList[i].gameLogList,value+i)
                historyprefab.getComponent(gameTag).historyItemFun(GameLogList[i].gameLogList, value + i)
                if (cc.isValid(nodeMask)) nodeMask.active = true;
                //value--;
            }
            ResCfg.loadPrefab(self, "sprnewItem", function (self, prefab) {
                self.historyempty = cc.instantiate(prefab);
                NodePoolMgr.instance.putNood(self.historyempty, NodePoolKey.HISTORY_XIN)
                if (enterGame.state == 0) {
                    self.updatesprnewItem(prefab);
                }
            }, true, true)

        }, true, true)

    }

    //创建历史
    receiveHistoryFun() {
        if (!cc.isValid(this.node)) return;
        let data = GameManager.instance.getStartAward()
        let gameName = GameColMgr.instance.getGameTag()
        let gameTag = "GameHistory"
        if (gameName == "longhudou") {
            gameTag = "LonghudouHistory"
        }
        let Record = this.node.getChildByName("nodeRecord")
        if (cc.isValid(this.historyreal) && this.historyreal.getChildByName("newestBg").active == true) {
            this.historyreal.getChildByName("newestBg").active = false;
        }
        if (cc.isValid(Record)) {
            let gameState = GameManager.instance.getGameState()
            if (gameState == 1) {
                // this.node.getChildByName("nodeRecord").active = true;
                this.node.getChildByName("nodeRecord").getComponent("GameHistory").historyItemFun(data, null, false)
            }
        }
        ResCfg.loadPrefab(this, "historyItem", function (self, prefab) {

            self.updateHistoryItem(prefab, gameTag, data)

        }, true, true)

    }

    
    //创建new
    receivesprnewFun() {
        if (cc.isValid(this.historyreal)) {
            this.historyreal.getChildByName("newestBg").active = false;
            let nodeMask = this.historyreal.getChildByName("sprMaskBox");
            if (cc.isValid(nodeMask)) nodeMask.active = true;
        }

        let Record = this.node.getChildByName("nodeRecord")
        if (cc.isValid(Record)) {
            this.node.getChildByName("nodeRecord").active = false;
        }
        let prefab = NodePoolMgr.instance.getNood(NodePoolKey.HISTORY_XIN)
        if (cc.isValid(prefab)) {
            this.updatesprnewItem(prefab)
        } else {
            ResCfg.loadPrefab(this, "sprnewItem", function (self, prefab) {
                self.updatesprnewItem(prefab)
            }, true, true)
        }
    }


    //生成历史
    updateHistoryItem(prefab, gameTag, data) {
        if (cc.isValid(this.historyempty)) {
            NodePoolMgr.instance.putNood(this.historyempty, NodePoolKey.HISTORY_XIN)
        }
        if (cc.isValid(this.historyreal)) {
            let historyrealca = this.historyreal.getChildByName("newestBg")
            if (historyrealca.active == true) {
                historyrealca.active = false;
            }
        }
        this.historyreal = cc.instantiate(prefab);
        this.scroew.content.addChild(this.historyreal);
        cc.log(gameTag)
        this.historyreal.getComponent(gameTag).historyItemFun(data)
        this.scroew.scrollToRight(0.5);
    }
    
    //生成new
    updatesprnewItem(prefab) {
        if (cc.isValid(this.historyempty)) {
            NodePoolMgr.instance.putNood(this.historyempty, NodePoolKey.HISTORY_XIN)
            this.historyempty = null
        }
        this.historyempty = cc.instantiate(prefab);
        let nodesize = this.historyempty.width
        this.Vexwidth = nodesize;
        this.scroew.content.addChild(this.historyempty);
        this.scroew.scrollToRight(0.5);
    }




    btnLeftshiftFun() {
        let Coord = this.scroew.getScrollOffset();
        Coord.x = -Coord.x
        Coord.x -= this.Vexwidth;
        this.scroew.scrollToOffset(cc.p(Coord.x, 0), 0.5);
    }

    btnRightFun() {
        let Coord = this.scroew.getScrollOffset();
        Coord.x = -Coord.x
        Coord.x += this.Vexwidth;
        this.scroew.scrollToOffset(cc.p(Coord.x, 0), 0.5);
    }

    btnSlideFun() {
        if (this.Sliding) return;
        let Coord = this.scroew.getScrollOffset();
        Coord.x = -Coord.x
        if (this.Slidingnew == null) {
            this.Slidingnew = Coord.x
        } else {
            this.Sliding = Coord.x
            if (this.Slidingnew > this.Sliding) {
                this.direction = "Left"
            } else if (this.Slidingnew < this.Sliding) {
                this.direction = "right"
            }
        }
    }

    historyCallbackFun() {
        this.node.getChildByName("btnLeft").getComponent(cc.Button).interactable = true
        this.node.getChildByName("btnRight").getComponent(cc.Button).interactable = true
        let Coord: cc.Vec2 = this.scroew.getScrollOffset();
        let maxCoord: cc.Vec2 = this.scroew.getMaxScrollOffset();

        if (Coord.x > 1) {
            this.node.getChildByName("btnLeft").getComponent(cc.Button).interactable = false
        } else if (Coord == maxCoord) {
            this.node.getChildByName("btnRight").getComponent(cc.Button).interactable = false
        }
    }
}
