import { Statistics } from "../../../../../GameConfig";
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
import { ResConfig as ResCfg } from "../../../../common/util/ResConfig"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { RecordModel } from "../../model/RecordModel"
import { RecordController } from "../../controller/RecordController"
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr";
const { ccclass, property } = cc._decorator

@ccclass
export default class ScrollView2 extends cc.Component {

    @property(cc.Sprite)
    sprLoad: cc.Sprite = null;
    @property(cc.Sprite)
    sprFram: cc.Sprite = null

    scroll: cc.ScrollView = null;
    Content: cc.Node = null
    pageCount: number = 0;
    countNum: number = 1;
    CoordCurrent: cc.Vec2 = cc.p()
    CoordMax: cc.Vec2 = cc.p();
    recordArr = [];
    param = {
        gameId: GameColMgr.instance.getGameId(),
        beginDate: 0,
        endDate: 0,
        dateUnit: 0,
        pageNum: this.countNum
    }
    bottomAndtopblr: boolean = true;
    GameTyp: number = null;
    onLoad() {
        this.GameTyp = GameColMgr.instance.getGameTyp();
        this.scroll = this.node.getComponent(cc.ScrollView)
        this.Content = this.scroll.content;

        ResCfg.loadPlist(this, "record", function (self, atlas) {
           // if(self.GameTyp == 3)self.GameTyp = 4;//特殊处理，庄家统计二八杠和小九相同
            let num = self.GameTyp + 1;
            if (num == 7) num = 6;
            self.upScrollViewFun(num);
            self.sprFram.spriteFrame = atlas.getSpriteFrame(`form-header_box_${num}`)
        })
        ResCfg.loadPrefab(this, Statistics[this.GameTyp], function (self, prefab) {
            for (let i = 0; i < 6; i++) {
                self.recordArr[i] = cc.instantiate(prefab);
                self.Content.addChild(self.recordArr[i]);
            }
            self.Content.width = self.recordArr[0].width
            RecordController.instance._sendAgreementFun(2, null)
        })

        let self = this;

        this.scroll.node.on("bounce-bottom", function () {
            self.pageCount = RecordModel.instance.getPageCount(2);
            if (self.countNum + 1 <= self.pageCount && (self.CoordCurrent.y > self.CoordMax.y + 33.5)) {
                ++self.countNum;
                RecordModel.instance.sendParamFun(2, self.countNum);
                self.bottomAndtopblr = true

            }

        })

        this.scroll.node.on("bounce-top", function () {
            self.pageCount = RecordModel.instance.getPageCount(2);
            if (self.countNum - 1 > 0 && (self.CoordCurrent.y < -45)) {

                --self.countNum;
                RecordModel.instance.sendParamFun(2, self.countNum);
                self.bottomAndtopblr = false;
            }
        })

    }
    onEnable() {
        RecordModel.instance.registerModelChanged("COMMON_RECORD_DATA_C", this.individualContentItem, this)

    }


    onDisable() {

        RecordModel.instance.unregisterModelChanged("COMMON_RECORD_DATA_C", this.individualContentItem, this)

    }
    onDestroy() {

        RecordModel.instance.unregisterModelChanged("COMMON_RECORD_DATA_C", this.individualContentItem, this)
    }

    individualContentItem(eventName: string, data) {   //列表刷新

        let dataArr = data
        let dataLen = dataArr.length
        let recordArrLen = this.recordArr.length
        for (let i = 0; i < 6; i++) {
            this.recordArr[i].getComponent(`RecordTypeItem${this.GameTyp}`)._initLblFun();
        }
        for (let i = 0; i < dataArr.length; i++) {
            if (i < recordArrLen) {
                this.recordArr[i].getComponent(`RecordTypeItem${this.GameTyp}`).recordGameTypeDataFun(dataArr[i]);
            } else {
                let prefab = this.reductionObjFun(this.GameTyp);
                if (cc.isValid(prefab)) {
                    this.Content.addChild(prefab)
                    prefab.getComponent(`RecordTypeItem${this.GameTyp}`).recordGameTypeDataFun(dataArr[i]);
                    this.recordArr.push(prefab)
                } else {
                    ResCfg.loadPrefab(this, Statistics[this.GameTyp], function (self, Prefab) {
                        let cView = cc.instantiate(Prefab);
                        self.Content.addChild(cView)
                        self.recordArr.push(cView)
                        cView.getComponent(`RecordTypeItem${self.GameTyp}`).recordGameTypeDataFun(dataArr[i]);
                    })
                }
            }
        }
        if (dataLen > 6) {
            let obj1 = null 
            for (let i =recordArrLen -1 ; i >= dataLen ; i--) {
                obj1 = this.recordArr.pop()
                if (cc.isValid(obj1)) {
                    this.recoveryObjFun(this.GameTyp, obj1)
                }
            }
        } else {
            let obj2 = null
            for (let i = recordArrLen -1; i >= 6; i--) {
                obj2 = this.recordArr.pop()
                if (cc.isValid(obj2)) {
                    this.recoveryObjFun(this.GameTyp,obj2)
                }
               
            }

        }

        if (this.bottomAndtopblr&&dataLen > 0) {
            this.scroll.scrollToTopLeft(0.1);
        } else {
            if (dataLen > 6) {
                this.scroll.scrollToBottomLeft(0.1);
            }
        }

    }
    offsetscrollViewFun() {

        this.CoordCurrent = this.scroll.getScrollOffset();
        this.CoordMax = this.scroll.getMaxScrollOffset();
        let CoordMin = -40;
        if (this.CoordCurrent.y < CoordMin) {
            this.sprLoad.node.active = true;
            this.sprLoad.node.setPositionY(150)
            this.sprLoad.node.resumeAllActions();
        } else if (this.CoordCurrent.y > this.CoordMax.y + 35) {
            this.sprLoad.node.setPositionY(-150)
            this.sprLoad.node.active = true;
            this.sprLoad.node.resumeAllActions();
        } else {
            this.sprLoad.node.active = false;
            this.sprLoad.node.pauseAllActions();
        }
        this.sprFram.node.setPosition(cc.p(this.CoordCurrent.x))
    }

    upScrollViewFun(gameType) {
        
        let brl = !Boolean( gameType == 2 || gameType == 3 || gameType == 6)
        this.scroll.horizontal = brl
        this.scroll.horizontalScrollBar.node.active = brl
    }

    recoveryObjFun(num: number, obj) { //回收对象
        switch (num) {
            case 1: NodePoolMgr.instance.putNood(obj, NodePoolKey.ZHUANG_HISTORY1)
                break;
            case 2: NodePoolMgr.instance.putNood(obj, NodePoolKey.ZHUANG_HISTORY2)
                break;
            case 3: NodePoolMgr.instance.putNood(obj, NodePoolKey.ZHUANG_HISTORY3)
                break;
            case 4: NodePoolMgr.instance.putNood(obj, NodePoolKey.ZHUANG_HISTORY4)
                break;
            case 5: NodePoolMgr.instance.putNood(obj, NodePoolKey.ZHUANG_HISTORY5)
                break;
            case 6: NodePoolMgr.instance.putNood(obj, NodePoolKey.ZHUANG_HISTORY6)
                break;
        }


    }

    reductionObjFun(num: number) {//还原对象
        let obj = null
        switch (num) {
            case 1: obj = NodePoolMgr.instance.getNood(NodePoolKey.ZHUANG_HISTORY1);
                break;
            case 2: obj = NodePoolMgr.instance.getNood(NodePoolKey.ZHUANG_HISTORY2);
                break;
            case 3: obj = NodePoolMgr.instance.getNood(NodePoolKey.ZHUANG_HISTORY3);
                break;
            case 4: obj = NodePoolMgr.instance.getNood(NodePoolKey.ZHUANG_HISTORY4);
                break;
            case 5: obj = NodePoolMgr.instance.getNood(NodePoolKey.ZHUANG_HISTORY5);
                break;
            case 6: obj = NodePoolMgr.instance.getNood(NodePoolKey.ZHUANG_HISTORY6);
                break;
        }
        return obj
    }


}







