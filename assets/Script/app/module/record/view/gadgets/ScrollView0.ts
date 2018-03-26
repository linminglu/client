import { ResConfig as ResCfg } from "../../../../common/util/ResConfig";
import { RecordModel } from "../../model/RecordModel"
import { GameManager } from "../../../../common/manager/GameManager"
import { EmitterManager as Emitter } from "../../../../common/manager/EmitterManager";
import { EmitterCfg } from "../../../../../app/config/EmitterConfig"
import { RecordController } from "../../controller/RecordController";
import { NodePoolMgr, NodePoolKey } from "../../../../common/manager/NodePoolMgr"
import { GameCollectManager as GameColMgr } from "../../../../common/manager/GameCollectManager"
const { ccclass, property } = cc._decorator

@ccclass
export default class ScrollView0 extends cc.Component {

    @property(cc.Sprite)
    sprLoad: cc.Sprite = null;
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
    onLoad() {

        this.scroll = this.node.getComponent(cc.ScrollView)
        this.Content = this.scroll.content;
        ResCfg.loadPrefab(this, "lotteryDataItem", function (self, prefab) {
            for (let i = 0; i < 6; i++) {
                self.recordArr[i] = cc.instantiate(prefab);
                self.Content.addChild(self.recordArr[i]);
            }
            RecordController.instance._sendAgreementFun(0, null)
            console.log("记录=========================")
        })

        let self = this;

        this.scroll.node.on("bounce-bottom", function () {
            self.pageCount = RecordModel.instance.getPageCount(0);
            if (self.countNum + 1 <= self.pageCount && (self.CoordCurrent.y > self.CoordMax.y + 33.5)) {
                ++self.countNum;
                self.bottomAndtopblr = true
                RecordModel.instance.sendParamFun(0, self.countNum)
            }

        })

        this.scroll.node.on("bounce-top", function () {
            self.pageCount = RecordModel.instance.getPageCount(0);
            if (self.countNum - 1 > 0 && (self.CoordCurrent.y < -45)) {

                --self.countNum;
                RecordModel.instance.sendParamFun(0, self.countNum)
                self.bottomAndtopblr = false;

            }
        })

    }
    onEnable() {
        RecordModel.instance.registerModelChanged("COMMON_RECORD_DATA_A", this.upRecordDataListFun0, this)
    }


    onDisable() {

        RecordModel.instance.unregisterModelChanged("COMMON_RECORD_DATA_A", this.upRecordDataListFun0, this)

    }
    onDestroy() {

        RecordModel.instance.unregisterModelChanged("COMMON_RECORD_DATA_A", this.upRecordDataListFun0, this)
     
    }

    upRecordDataListFun0(eventName: string, data) {   //列表刷新

        









        let dataArr = data
        let dataLen = dataArr.length
        let recordArrLen = this.recordArr.length


        // for(let i = 0 ; i < 30 ; i++){
        //     if(i <= dataArr.length -1){
        //         this.recordArr[i].active = true
        //         this.recordArr[i].getComponent("LotteryDataItem").recordLotteryDataFun(dataArr[i]);
        //     }else{
        //         this.recordArr[i].active = false
        //     }

        // }

        //console.log("记录=========================",data)

        for (let i = 0; i < 6; i++) {
            this.recordArr[i].getComponent("LotteryDataItem")._initLblFun();
        }
        for (let i = 0; i < dataArr.length; i++) {
            if (i < recordArrLen) {
                this.recordArr[i].getComponent("LotteryDataItem").recordLotteryDataFun(dataArr[i]);
            } else {
                let prefab = NodePoolMgr.instance.getNood(NodePoolKey.LOTTERY_HISTORY)
                //console.log("prefab====",prefab)
                if (cc.isValid(prefab)) {
                    this.Content.addChild(prefab)
                    prefab.getComponent("LotteryDataItem").recordLotteryDataFun(dataArr[i]);
                    this.recordArr.push(prefab)
                    //console.log("11111111111111111111111111创建了")
                } else {
                    ResCfg.loadPrefab(this, "lotteryDataItem", function (self, Prefab) {
                        let cView = cc.instantiate(Prefab);
                        self.Content.addChild(cView)
                        self.recordArr.push(cView)
                        cView.getComponent("LotteryDataItem").recordLotteryDataFun(dataArr[i]);
                    })
                }
            }
        }
        // if(cc.isValid(this.recordArr[recordArrLen-1])){
        //     console.log("777777777777777777777777777777",this.recordArr[recordArrLen-1].children)
        // }
        if (dataLen > 6) {
            let obj1 = null 
            for (let i =recordArrLen -1 ; i >= dataLen ; i--) {
                obj1 = this.recordArr.pop()
                if (cc.isValid(obj1)) {
                    NodePoolMgr.instance.putNood(obj1, NodePoolKey.LOTTERY_HISTORY)
                }
            }
        } else {
            let obj2 = null
            for (let i = recordArrLen -1; i >= 6; i--) {
                obj2 = this.recordArr.pop()
                if (cc.isValid(obj2)) {
                    NodePoolMgr.instance.putNood(obj2, NodePoolKey.LOTTERY_HISTORY)
                }
               
            }

        }

        if (this.bottomAndtopblr) {
            this.scroll.scrollToTop(0.1);
        } else {
            if (dataLen > 6) {
                this.scroll.scrollToBottom(0.1);
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

    }

}







